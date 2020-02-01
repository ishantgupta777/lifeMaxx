package com.antailbaxt3r.disastermanagementapp.ui.addLostPerson;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class AddLostPersonViewModel extends ViewModel {

    private MutableLiveData<String> mText;

    public AddLostPersonViewModel() {
        mText = new MutableLiveData<>();
        mText.setValue("This is tools fragment");
    }

    public LiveData<String> getText() {
        return mText;
    }
}