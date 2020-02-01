package com.antailbaxt3r.disastermanagementapp.utils;


import android.app.Activity;
import android.app.Application;
import android.os.Bundle;

import androidx.annotation.Nullable;

import com.facebook.drawee.backends.pipeline.Fresco;
import com.mapbox.mapboxsdk.Mapbox;

public class App extends Application {

    private static App instance;

    private SessionManager sessionManager;

    @Override
    public void onCreate() {
        super.onCreate();
        instance = this;
        sessionManager = new SessionManager(this);
        Fresco.initialize(this);
        Mapbox.getInstance(this, "pk.eyJ1IjoiYW50YWlsYmF4dDNyIiwiYSI6ImNrNXM0Z284azBrN2EzZW4xYXAxY29hYnEifQ.zeh5xzVaZ-ve3GiFTDdK6g");
    }

    public static App getInstance(){
        return instance;
    }

    public SessionManager getSessionManager() {
        return sessionManager;
    }
}
