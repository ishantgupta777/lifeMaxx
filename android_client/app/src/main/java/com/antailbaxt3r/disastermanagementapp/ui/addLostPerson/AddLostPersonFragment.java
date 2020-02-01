package com.antailbaxt3r.disastermanagementapp.ui.addLostPerson;

import android.app.ProgressDialog;
import android.content.Context;
import android.location.Location;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProviders;

import com.antailbaxt3r.disastermanagementapp.R;
import com.antailbaxt3r.disastermanagementapp.models.PeopleAPIModel;
import com.antailbaxt3r.disastermanagementapp.retrofit.RetrofitClient;
import com.antailbaxt3r.disastermanagementapp.retrofit.RetrofitClient2;
import com.antailbaxt3r.disastermanagementapp.ui.heatmap.HeatMapViewModel;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.gson.JsonArray;
import com.google.gson.JsonIOException;
import com.google.gson.JsonObject;
import com.mapbox.mapboxsdk.annotations.Icon;
import com.mapbox.mapboxsdk.annotations.IconFactory;
import com.mapbox.mapboxsdk.annotations.Marker;
import com.mapbox.mapboxsdk.annotations.MarkerOptions;
import com.mapbox.mapboxsdk.camera.CameraPosition;
import com.mapbox.mapboxsdk.camera.CameraUpdate;
import com.mapbox.mapboxsdk.geometry.LatLng;
import com.mapbox.mapboxsdk.maps.MapView;
import com.mapbox.mapboxsdk.maps.MapboxMap;
import com.mapbox.mapboxsdk.maps.OnMapReadyCallback;
import com.mapbox.mapboxsdk.maps.Style;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class AddLostPersonFragment extends Fragment {

    private HeatMapViewModel heatMapViewModel;
    private MapView mapView;
    private FusedLocationProviderClient fusedLocationClient;
    private JSONObject collection;
    private List geoList = new ArrayList();
    private double lat, lng;

    private AddLostPersonViewModel addLostPersonViewModel;

    private EditText name, age, email, number, lastSeen ;
    private LinearLayout uploadButton;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        addLostPersonViewModel =
                ViewModelProviders.of(this).get(AddLostPersonViewModel.class);
        final View root = inflater.inflate(R.layout.fragment_add_lost_person, container, false);
        attachID(root);
        mapView = root.findViewById(R.id.map_view);
        mapView.onCreate(savedInstanceState);

        Context context;
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(root.getContext());


        mapView.getMapAsync(new OnMapReadyCallback() {
            @Override
            public void onMapReady(@NonNull final MapboxMap mapboxMap) {

                mapboxMap.setStyle(new Style.Builder().fromUri("mapbox://styles/antailbaxt3r/ck62kbein14yp1ioynx0s4n91"), new Style.OnStyleLoaded() {
                    @Override
                    public void onStyleLoaded(@NonNull final Style style) {

                        // Map is set up and the style has loaded. Now you can add data or make other map adjustments.

                        final Icon icon = IconFactory.getInstance(root.getContext()).fromResource(R.drawable.marker_blue);

                                lastSeen.addTextChangedListener(new TextWatcher() {
                                    @Override
                                    public void beforeTextChanged(CharSequence s, int start, int count, int after) {
//                                        Map<String, String> map = new HashMap<>();
//                                        map.put("key", "ekC8XsButuiKAx0FzPDfCxNBxOeZoZPV");
//                                        map.put("location", s.toString());
                                        if(s.toString().isEmpty()){
                                            return;
                                        }

                                    }

                                    @Override
                                    public void onTextChanged(CharSequence s, int start, int before, int count) {
                                        if(s.toString().isEmpty()){
                                            return;
                                        }
                                    }

                                    @Override
                                    public void afterTextChanged(Editable s) {
                                        if(s.toString().isEmpty()){
                                            return;
                                        }
                                        final Map<String, String> map = new HashMap<>();
                                        map.put("location", s.toString());
                                        map.put("key", "ekC8XsButuiKAx0FzPDfCxNBxOeZoZPV");
                                        Call<JsonObject> call2 = RetrofitClient2.getClient_mapQuest().getCoordinates(map);
                                        call2.enqueue(new Callback<JsonObject>() {
                                            @Override
                                            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {

                                                try {
                                                    Log.i("RESPONSE : ", String.valueOf(response.body()));
                                                    JsonArray obj = response.body().get("results").getAsJsonArray();

                                                    Log.i("obj : ", obj.get(0).toString());
                                                    JsonObject obj1 = (JsonObject) obj.get(0);
                                                    JsonArray locations = (JsonArray) obj1.get("locations");
                                                    JsonObject first = (JsonObject) locations.get(0);

                                                    Log.i("LOCATIONS : ", locations.toString());

                                                    JsonObject latLng = (JsonObject) first.get("latLng");

                                                    Log.i("FIRST : ", first.toString());
                                                    Log.i("latlng : ", latLng.toString());
                                                    lat = (double) latLng.get("lat").getAsDouble();
                                                    lng = (double) latLng.get("lng").getAsDouble();

                                                    Log.i("obj : ", obj.get(0).toString());
                                                    Log.i("LAT : ", String.valueOf(lat));
                                                    Log.i("LNG : ", String.valueOf(lng));

//                                                    mapboxMap.updateMarker(new Marker(new MarkerOptions()
//                                                    .position(new LatLng(lat, lng))));
                                                    for(Marker marker : mapboxMap.getMarkers()) {
                                                        mapboxMap.removeMarker(marker);
                                                    }
                                                    final Icon icon = IconFactory.getInstance(root.getContext()).fromResource(R.drawable.marker_blue);
                                                    mapboxMap.addMarker(new MarkerOptions()
                                                            .position(new LatLng(lat, lng))
                                                            .setIcon(icon));
//                                                    mapboxMap.setCameraPosition(new CameraPosition.Builder()
//                                                            .target(new LatLng(lat, lng))
//                                                            .zoom(10)
//                                                            .build());
                                                    mapboxMap.animateCamera(new CameraUpdate() {
                                                        @Nullable
                                                        @Override
                                                        public CameraPosition getCameraPosition(@NonNull MapboxMap mapboxMap) {
                                                            return new CameraPosition.Builder()
                                                            .target(new LatLng(lat, lng))
                                                            .zoom(3)
                                                            .build();
                                                        }
                                                    }, 500);


                                                } catch (JsonIOException e) {
                                                    Log.e("JSON ERROR : ", e.getMessage());
                                                }
                                            }

                                            @Override
                                            public void onFailure(Call<JsonObject> call, Throwable t) {

                                            }
                                        });
                                    }
                                });
                            }
                        });

                        final ProgressDialog progressDialog = new ProgressDialog(root.getContext());
                        progressDialog.setMessage("Loading...");

                        uploadButton.setOnClickListener(new View.OnClickListener() {
                            @Override
                            public void onClick(View v) {


                                if(name.getText().toString().isEmpty() || age.getText().toString().isEmpty()){
                                    Toast.makeText(root.getContext(), "Name and Age and mandatory", Toast.LENGTH_SHORT).show();
                                    return;
                                }

                                progressDialog.show();

                                Map<String, Object> map = new HashMap<>();

                                map.put("name", name.getText().toString());
                                map.put("number", number.getText().toString());
                                map.put("rescueCenter", lastSeen.getText().toString());
                                map.put("age", age.getText().toString());
                                map.put("foundLost", "NotFound");
                                ArrayList<Double> coordinates = new ArrayList<>();
                                if(lat != 0 && lng != 0) {
                                    coordinates.add(lat);
                                    coordinates.add(lng);
                                    map.put("lastLocation", coordinates);
                                }else{
                                    map.put("lastLocation", null);
                                }


                                Call call = RetrofitClient.getClient().sendPerson(map);
                                call.enqueue(new Callback() {
                                    @Override
                                    public void onResponse(Call call, Response response) {
                                        Toast.makeText(root.getContext(), "Uploaded Successfully", Toast.LENGTH_SHORT).show();
                                        progressDialog.dismiss();
                                        name.setText("");
                                        age.setText("");
                                        email.setText("");
                                        lastSeen.setText("");
                                        number.setText("");
                                        for(Marker marker : mapboxMap.getMarkers()) {
                                            mapboxMap.removeMarker(marker);
                                        }
                                    }

                                    @Override
                                    public void onFailure(Call call, Throwable t) {
                                        progressDialog.dismiss();
                                        name.setText("");
                                        age.setText("");
                                        email.setText("");
                                        lastSeen.setText("");
                                        number.setText("");
                                        for(Marker marker : mapboxMap.getMarkers()) {
                                            mapboxMap.removeMarker(marker);
                                        }
                                    }
                                });
                            }
                        });

                    }
                });



        return root;
    }


    private void attachID(View root) {
            name = root.findViewById(R.id.person_name_et);
            age = root.findViewById(R.id.person_age_et);
            number = root.findViewById(R.id.person_number_et);
            email = root.findViewById(R.id.person_email_et);
            lastSeen = root.findViewById(R.id.person_last_seen_et);
            uploadButton = root.findViewById(R.id.upload_button);

    }
}