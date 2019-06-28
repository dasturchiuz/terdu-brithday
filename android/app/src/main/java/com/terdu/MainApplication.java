package com.terdu;

import android.app.Application;
import android.os.Bundle;
import android.content.Intent;
import com.facebook.react.ReactApplication;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.pilloxa.backgroundjob.BackgroundJobPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import org.pgsqlite.SQLitePluginPackage;
import java.util.Arrays;
import java.util.List;
import com.facebook.react.HeadlessJsTaskService;


public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ReactNativePushNotificationPackage(),
            new BackgroundJobPackage(),
           
            // new BackgroundTaskPackage(),
            new SplashScreenReactPackage(),
            new VectorIconsPackage(),
            new RNGestureHandlerPackage(),
            new SQLitePluginPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    // BackgroundTaskPackage.useContext(this);

    // // starting service...
    // Intent service = new Intent(getApplicationContext(), MyTaskService.class);
    // Bundle bundle = new Bundle();
    // bundle.putString("service", "SomeTaskName");
    // service.putExtras(bundle);
    // getApplicationContext().startService(service);
  }
}
