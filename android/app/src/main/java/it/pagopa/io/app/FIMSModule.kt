package it.pagopa.io.app

import android.os.Handler
import android.os.Looper
import android.util.Log
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.lang.ref.WeakReference

class FIMSModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  private var mPromiseWR: WeakReference<Promise>? = null

  override fun getName(): String {
    return "FIMSModule"
  }
  @Suppress("unused")
  @ReactMethod fun startFIMSFlow(relyingPartyUrl: String, inputPromise: Promise) {
    mPromiseWR = WeakReference(inputPromise)
    Log.e(this::class.simpleName, "${this::startFIMSFlow.name}: (${relyingPartyUrl})")
    val mainHandler = Handler(Looper.getMainLooper())
    mainHandler.postDelayed({
      Log.e(this::class.simpleName, "${this::startFIMSFlow.name}: callback")
      mPromiseWR?.get()?.resolve("From Android with love")
    }, 3000)
  }
}
