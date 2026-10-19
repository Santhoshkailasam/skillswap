package com.skillswap

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import java.io.File

class MainApplication : Application(), ReactApplication {

  override val reactHost: ReactHost by lazy {
    val bundleFile = File(applicationContext.filesDir, "codepush/index.android.bundle")
    val bundlePath = if (bundleFile.exists() && bundleFile.length() > 0) {
      bundleFile.absolutePath
    } else {
      null
    }

    getDefaultReactHost(
      context = applicationContext,
      packageList =
        PackageList(this).packages.apply {
          add(CodePushPackage())
        },
      jsBundleFilePath = bundlePath,
    )
  }

  override fun onCreate() {
    super.onCreate()
    loadReactNative(this)
  }
}
