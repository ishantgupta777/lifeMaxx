package com.antailbaxt3r.disastermanagementapp.utils;


import android.app.Activity;
import android.os.Bundle;

import androidx.annotation.Nullable;

public class App extends Activity {

    private static App instance;

    private SessionManager sessionManager;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        instance = this;
        sessionManager = new SessionManager(this);
    }

    public static App getInstance(){
        return instance;
    }

    public SessionManager getSessionManager() {
        return sessionManager;
    }
}
