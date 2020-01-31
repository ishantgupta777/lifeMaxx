package com.antailbaxt3r.disastermanagementapp.adapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.antailbaxt3r.disastermanagementapp.R;
import com.antailbaxt3r.disastermanagementapp.models.PeopleAPIModel;
import com.antailbaxt3r.disastermanagementapp.viewholders.PersonRVViewHolder;

import java.util.ArrayList;
import java.util.List;

public class PersonRVAdapter extends RecyclerView.Adapter<PersonRVViewHolder> {

    List<PeopleAPIModel> peopleList = new ArrayList<>();
    Context context;

    public PersonRVAdapter(List<PeopleAPIModel> peopleList, Context context) {
        this.peopleList = peopleList;
        this.context = context;
    }

    @NonNull
    @Override
    public PersonRVViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.person_item_layout, parent, false);
        return new PersonRVViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull PersonRVViewHolder holder, int position) {
        holder.populate(peopleList.get(position), context);
    }

    @Override
    public int getItemCount() {
        return peopleList.size();
    }
}
