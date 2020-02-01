package com.antailbaxt3r.disastermanagementapp.ui.addRefugee;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class AddRefugeeViewModel extends ViewModel {

    private MutableLiveData<String> mText;

    public AddRefugeeViewModel() {
        mText = new MutableLiveData<>();
        mText.setValue("This is gallery fragment");
    }

    public LiveData<String> getText() {
        return mText;
    }
}