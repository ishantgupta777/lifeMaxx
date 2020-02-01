package com.antailbaxt3r.disastermanagementapp.ui.heatmap;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class HeatMapViewModel extends ViewModel {

    private MutableLiveData<String> mText;

    public HeatMapViewModel() {
        mText = new MutableLiveData<>();
        mText.setValue("This is slideshow fragment");
    }

    public LiveData<String> getText() {
        return mText;
    }
}