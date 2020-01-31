package com.antailbaxt3r.disastermanagementapp.ui.home;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.Nullable;
import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProviders;

import com.antailbaxt3r.disastermanagementapp.R;
import com.antailbaxt3r.disastermanagementapp.models.PeopleAPIModel;
import com.antailbaxt3r.disastermanagementapp.retrofit.RetrofitClient;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class HomeFragment extends Fragment {

    private HomeViewModel homeViewModel;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        homeViewModel =
                ViewModelProviders.of(this).get(HomeViewModel.class);
        View root = inflater.inflate(R.layout.fragment_home, container, false);
        final TextView textView = root.findViewById(R.id.text_home);
        homeViewModel.getText().observe(getViewLifecycleOwner(), new Observer<String>() {
            @Override
            public void onChanged(@Nullable String s) {
                textView.setText(s);
            }
        });

        Call<List<PeopleAPIModel>> call = RetrofitClient.getClient().getPerson();

        ArrayList<PeopleAPIModel> peopleList = new ArrayList<>();

        call.enqueue(new Callback<List<PeopleAPIModel>>() {
            @Override
            public void onResponse(Call<List<PeopleAPIModel>> call, Response<List<PeopleAPIModel>> response) {
                List<PeopleAPIModel> list = response.body();
                for(PeopleAPIModel peopleAPIModel : list){
                    System.out.println(peopleAPIModel);
                }
            }

            @Override
            public void onFailure(Call<List<PeopleAPIModel>> call, Throwable t) {

            }
        });

        return root;
    }
}