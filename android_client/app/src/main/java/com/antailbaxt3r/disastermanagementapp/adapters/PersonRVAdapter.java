package com.antailbaxt3r.disastermanagementapp.adapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Filter;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.antailbaxt3r.disastermanagementapp.R;
import com.antailbaxt3r.disastermanagementapp.models.PeopleAPIModel;
import com.antailbaxt3r.disastermanagementapp.viewholders.PersonRVViewHolder;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

public class PersonRVAdapter extends RecyclerView.Adapter<PersonRVViewHolder> {

    List<PeopleAPIModel> peopleList = new ArrayList<>();
    Context context;
    List<PeopleAPIModel> peopleListFiltered;

    public PersonRVAdapter(List<PeopleAPIModel> peopleList, Context context) {
        this.peopleList = peopleList;
        this.context = context;
        peopleListFiltered = new ArrayList<>(peopleList);
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

    public Filter getFilter(){
        return pokemonFilter;
    }

    private Filter pokemonFilter = new Filter() {
        @Override
        protected FilterResults performFiltering(CharSequence charSequence) {

            List<PeopleAPIModel> filteredList = new ArrayList<>();

            if (charSequence == null || charSequence.length() == 0){
                filteredList.addAll(peopleListFiltered);
            }else {
                String filterPattern = charSequence.toString().toLowerCase().trim();

                for(PeopleAPIModel item : peopleListFiltered){

                    if(item.getName().toLowerCase().contains(filterPattern)){
                        filteredList.add(item);
                    }
                }
            }

            FilterResults results = new FilterResults();
            results.values = filteredList;

            return results;
        }

        @Override
        protected void publishResults(CharSequence charSequence, FilterResults filterResults) {

            peopleList.clear();
            peopleList.addAll((List)filterResults.values);
            notifyDataSetChanged();
        }
    };
}
