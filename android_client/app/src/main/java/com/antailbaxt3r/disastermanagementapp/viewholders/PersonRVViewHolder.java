package com.antailbaxt3r.disastermanagementapp.viewholders;

import android.content.Context;
import android.net.Uri;
import android.view.View;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.antailbaxt3r.disastermanagementapp.R;
import com.antailbaxt3r.disastermanagementapp.models.PeopleAPIModel;
import com.facebook.drawee.view.SimpleDraweeView;

public class PersonRVViewHolder extends RecyclerView.ViewHolder {

    private SimpleDraweeView image;
    private TextView name_tv, found_tv;

    public PersonRVViewHolder(@NonNull View itemView) {
        super(itemView);

        image = itemView.findViewById(R.id.person_image);
        found_tv = itemView.findViewById(R.id.person_found);
        name_tv = itemView.findViewById(R.id.person_name);
    }

    public void populate(PeopleAPIModel item, Context context){
        if(!(item.getImage() == null || item.getImage() == "undefined")) {
            Uri uri = Uri.parse(item.getImage());
            image.setImageURI(uri);
        }
        found_tv.setText(item.getFoundLost());
        name_tv.setText(item.getName());
        if(found_tv.getText().toString().toLowerCase().equals("found")){
            found_tv.setTextColor(context.getResources().getColor(R.color.green));
        }else{
            found_tv.setTextColor(context.getResources().getColor(R.color.red));
        }

    }
    public SimpleDraweeView getImage() {
        return image;
    }

    public void setImage(SimpleDraweeView image) {
        this.image = image;
    }

    public TextView getName_tv() {
        return name_tv;
    }

    public void setName_tv(TextView name_tv) {
        this.name_tv = name_tv;
    }

    public TextView getFound_tv() {
        return found_tv;
    }

    public void setFound_tv(TextView found_tv) {
        this.found_tv = found_tv;
    }
}
