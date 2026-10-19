package com.skillswap

import android.content.Intent
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.io.File
import java.io.FileOutputStream
import java.net.HttpURLConnection
import java.net.URL
import java.util.zip.ZipEntry
import java.util.zip.ZipInputStream

class CodePushNativeModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "CodePushNative"

    @ReactMethod
    fun downloadAndApplyBundle(downloadUrl: String, version: String, promise: Promise) {
        Thread {
            try {
                val codepushDir = File(reactContext.filesDir, "codepush")
                if (!codepushDir.exists()) {
                    codepushDir.mkdirs()
                }

                val zipFile = File(codepushDir, "bundle_update.zip")

                // 1. Download bundle zip from CodePush server
                val url = URL(downloadUrl)
                val connection = url.openConnection() as HttpURLConnection
                connection.requestMethod = "GET"
                connection.connectTimeout = 30000
                connection.readTimeout = 30000
                connection.connect()

                if (connection.responseCode !in 200..299) {
                    promise.reject("DOWNLOAD_FAILED", "Server responded with HTTP ${connection.responseCode}")
                    return@Thread
                }

                connection.inputStream.use { input ->
                    FileOutputStream(zipFile).use { output ->
                        input.copyTo(output)
                    }
                }

                // 2. Extract index.android.bundle and resources to app internal files dir
                ZipInputStream(zipFile.inputStream()).use { zipInput ->
                    var entry: ZipEntry? = zipInput.nextEntry
                    while (entry != null) {
                        val outFile = File(codepushDir, entry.name)
                        if (entry.isDirectory) {
                            outFile.mkdirs()
                        } else {
                            outFile.parentFile?.mkdirs()
                            FileOutputStream(outFile).use { out ->
                                zipInput.copyTo(out)
                            }
                        }
                        zipInput.closeEntry()
                        entry = zipInput.nextEntry
                    }
                }

                // 3. Remove temporary zip file
                zipFile.delete()

                // 4. Save current version tag
                val versionFile = File(codepushDir, "current_version.txt")
                versionFile.writeText(version)

                promise.resolve(true)
            } catch (e: Exception) {
                promise.reject("CODEPUSH_ERROR", e.message, e)
            }
        }.start()
    }

    @ReactMethod
    fun restartApp() {
        try {
            val intent = reactContext.packageManager.getLaunchIntentForPackage(reactContext.packageName)
            intent?.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK)
            reactContext.startActivity(intent)
            Runtime.getRuntime().exit(0)
        } catch (e: Exception) {
            // Fallback
        }
    }

    @ReactMethod
    fun getCurrentBundleVersion(promise: Promise) {
        try {
            val versionFile = File(reactContext.filesDir, "codepush/current_version.txt")
            if (versionFile.exists()) {
                promise.resolve(versionFile.readText().trim())
            } else {
                promise.resolve("1.0.0")
            }
        } catch (e: Exception) {
            promise.resolve("1.0.0")
        }
    }
}
