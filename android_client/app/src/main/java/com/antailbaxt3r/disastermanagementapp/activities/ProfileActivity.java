package com.antailbaxt3r.disastermanagementapp.activities;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.antailbaxt3r.disastermanagementapp.R;
import com.antailbaxt3r.disastermanagementapp.models.PeopleAPIModel;
import com.facebook.drawee.view.SimpleDraweeView;
import com.google.gson.Gson;

public class ProfileActivity extends AppCompatActivity {

    private TextView name, age, found, number, foundAt;
    private SimpleDraweeView image;
    private LinearLayout contactButton;
    private static int PERMISSION_REQUEST_CODE = 777;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile);
        attachID();

        Gson gson = new Gson();
        final PeopleAPIModel person = gson.fromJson(getIntent().getStringExtra("json"), PeopleAPIModel.class);

        person.getImage().toLowerCase();
        if (!person.getImage().toLowerCase().equals("undefined")) {
            Uri uri = Uri.parse(person.getImage());
            image.setImageURI(uri);
        }
        try {
            name.setText(person.getName());
        } catch (Exception e) {
        }

            age.setText(String.valueOf(person.getAge()));

        try {
            number.setText(person.getNumber());
        } catch (Exception e) {

        }

        contactButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent callIntent = new Intent(Intent.ACTION_CALL);
                callIntent.setData(Uri.parse("tel:" + person.getNumber()));//change the number
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                    if (checkSelfPermission(Manifest.permission.CALL_PHONE) != PackageManager.PERMISSION_GRANTED) {
                        ActivityCompat.requestPermissions(ProfileActivity.this, new String[]{Manifest.permission.CALL_PHONE}, PERMISSION_REQUEST_CODE);
                        return;
                    }else {
                        startActivity(callIntent);
                    }
                }
            }
        });


    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        switch(requestCode) {
            case 777:
                if (grantResults.length > 0) {

                    boolean accepted = grantResults[0] == PackageManager.PERMISSION_GRANTED;

                    if (accepted)
                        Toast.makeText(this, "Permission Granted!", Toast.LENGTH_SHORT).show();
                    else {

                        Toast.makeText(this, "Permission Denied", Toast.LENGTH_LONG).show();


                    }
                }
                break;
        }


    }



    private void attachID() {
        name = findViewById(R.id.person_name);
        age = findViewById(R.id.person_age);
        found = findViewById(R.id.person_found);
        foundAt = findViewById(R.id.person_found_at);
        image = findViewById(R.id.person_image);
        number = findViewById(R.id.person_number);
        contactButton = findViewById(R.id.contact_button);
    }
}
