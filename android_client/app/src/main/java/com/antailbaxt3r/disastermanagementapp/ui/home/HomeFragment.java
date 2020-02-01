package com.antailbaxt3r.disastermanagementapp.ui.home;

import android.Manifest;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.annotation.NonNull;
import androidx.appcompat.widget.SearchView;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProviders;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.antailbaxt3r.disastermanagementapp.R;
import com.antailbaxt3r.disastermanagementapp.adapters.PersonRVAdapter;
import com.antailbaxt3r.disastermanagementapp.models.PeopleAPIModel;
import com.antailbaxt3r.disastermanagementapp.retrofit.RetrofitClient;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class HomeFragment extends Fragment {

    private HomeViewModel homeViewModel;
    private RecyclerView recyclerView;
    private PersonRVAdapter adapter;
    private SearchView searchView;
    private SearchView.OnQueryTextListener searchQuery;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {

        homeViewModel =
                ViewModelProviders.of(this).get(HomeViewModel.class);
        View root = inflater.inflate(R.layout.fragment_home, container, false);

        Call<List<PeopleAPIModel>> call = RetrofitClient.getClient().getPerson();

        ArrayList<PeopleAPIModel> peopleList = new ArrayList<>();
        recyclerView = root.findViewById(R.id.person_rv);
        searchView = root.findViewById(R.id.search_view);

        if (searchView != null) {
            searchQuery = new androidx.appcompat.widget.SearchView.OnQueryTextListener() {
                @Override
                public boolean onQueryTextSubmit(String s) {
                    return false;
                }

                @Override
                public boolean onQueryTextChange(String s) {
                    if (adapter != null) {
                        adapter.getFilter().filter(s);
                    }

                    return false;
                }
            };
            searchView.setOnQueryTextListener(searchQuery);

        }

        if (ContextCompat.checkSelfPermission(getContext(), Manifest.permission.ACCESS_FINE_LOCATION)
                == PackageManager.PERMISSION_DENIED){
            ActivityCompat.requestPermissions(getActivity(), new String[] {Manifest.permission.ACCESS_FINE_LOCATION}, 111);
        }
        final ProgressDialog progressDialog = new ProgressDialog(getActivity());
        progressDialog.setMessage("Loading...");
        progressDialog.show();

        call.enqueue(new Callback<List<PeopleAPIModel>>() {
            @Override
            public void onResponse(Call<List<PeopleAPIModel>> call, Response<List<PeopleAPIModel>> response) {
                List<PeopleAPIModel> list = response.body();
                adapter = new PersonRVAdapter(list, getActivity());
                Context context;
                recyclerView.setLayoutManager(new LinearLayoutManager(getActivity()));
                recyclerView.setAdapter(adapter);
                adapter.notifyDataSetChanged();
                progressDialog.dismiss();
            }

            @Override
            public void onFailure(Call<List<PeopleAPIModel>> call, Throwable t) {

                progressDialog.dismiss();
                Toast.makeText(getActivity(), "No internet connection!", Toast.LENGTH_SHORT).show();
            }
        });

        return root;
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == 111) {
            if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                Toast.makeText(getActivity(), "Location Access Granted!", Toast.LENGTH_SHORT).show();
            }else{
                Toast.makeText(getActivity(), "Please go to setting to provide location access", Toast.LENGTH_SHORT).show();
            }
        }
    }
}