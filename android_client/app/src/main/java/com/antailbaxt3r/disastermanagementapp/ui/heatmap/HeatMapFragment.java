package com.antailbaxt3r.disastermanagementapp.ui.heatmap;

import android.content.Context;
import android.graphics.Color;
import android.location.Location;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProviders;

import com.antailbaxt3r.disastermanagementapp.R;
import com.antailbaxt3r.disastermanagementapp.models.PeopleAPIModel;
import com.antailbaxt3r.disastermanagementapp.retrofit.RetrofitClient;
import com.fasterxml.jackson.core.JsonFactory;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.api.client.json.Json;
import com.mapbox.geojson.Feature;
import com.mapbox.geojson.FeatureCollection;
import com.mapbox.mapboxsdk.annotations.Icon;
import com.mapbox.mapboxsdk.annotations.IconFactory;
import com.mapbox.mapboxsdk.annotations.MarkerOptions;
import com.mapbox.mapboxsdk.camera.CameraPosition;
import com.mapbox.mapboxsdk.camera.CameraUpdateFactory;
import com.mapbox.mapboxsdk.geometry.LatLng;
import com.mapbox.mapboxsdk.maps.MapView;
import com.mapbox.mapboxsdk.maps.MapboxMap;
import com.mapbox.mapboxsdk.maps.OnMapReadyCallback;
import com.mapbox.mapboxsdk.maps.Style;
import com.mapbox.mapboxsdk.style.expressions.Expression;
import com.mapbox.mapboxsdk.style.layers.CircleLayer;
import com.mapbox.mapboxsdk.style.layers.SymbolLayer;
import com.mapbox.mapboxsdk.style.layers.TransitionOptions;
import com.mapbox.mapboxsdk.style.sources.GeoJsonOptions;
import com.mapbox.mapboxsdk.style.sources.GeoJsonSource;
import com.mapbox.mapboxsdk.utils.BitmapUtils;

import org.json.JSONArray;
import org.json.JSONObject;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import static android.graphics.Color.rgb;
import static com.mapbox.mapboxsdk.style.expressions.Expression.all;
import static com.mapbox.mapboxsdk.style.expressions.Expression.exponential;
import static com.mapbox.mapboxsdk.style.expressions.Expression.get;
import static com.mapbox.mapboxsdk.style.expressions.Expression.gte;
import static com.mapbox.mapboxsdk.style.expressions.Expression.has;
import static com.mapbox.mapboxsdk.style.expressions.Expression.interpolate;
import static com.mapbox.mapboxsdk.style.expressions.Expression.literal;
import static com.mapbox.mapboxsdk.style.expressions.Expression.lt;
import static com.mapbox.mapboxsdk.style.expressions.Expression.stop;
import static com.mapbox.mapboxsdk.style.expressions.Expression.toNumber;
import static com.mapbox.mapboxsdk.style.layers.PropertyFactory.circleColor;
import static com.mapbox.mapboxsdk.style.layers.PropertyFactory.circleRadius;
import static com.mapbox.mapboxsdk.style.layers.PropertyFactory.iconColor;
import static com.mapbox.mapboxsdk.style.layers.PropertyFactory.iconImage;
import static com.mapbox.mapboxsdk.style.layers.PropertyFactory.iconSize;
import static com.mapbox.mapboxsdk.style.layers.PropertyFactory.textAllowOverlap;
import static com.mapbox.mapboxsdk.style.layers.PropertyFactory.textColor;
import static com.mapbox.mapboxsdk.style.layers.PropertyFactory.textField;
import static com.mapbox.mapboxsdk.style.layers.PropertyFactory.textIgnorePlacement;
import static com.mapbox.mapboxsdk.style.layers.PropertyFactory.textSize;

public class HeatMapFragment extends Fragment {

    private HeatMapViewModel heatMapViewModel;
    private MapView mapView;
    private FusedLocationProviderClient fusedLocationClient;
    private JSONObject collection;
    private List geoList = new ArrayList();

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        heatMapViewModel =
                ViewModelProviders.of(this).get(HeatMapViewModel.class);
        final View root = inflater.inflate(R.layout.fragment_heatmap, container, false);

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
                        fusedLocationClient.getLastLocation().addOnSuccessListener(new OnSuccessListener<Location>() {
                            @Override
                            public void onSuccess(Location location) {

                                //blue marker
                                mapboxMap.addMarker(new MarkerOptions()
                                        .title("Current Location")
                                        .position(new LatLng(
                                                location.getLatitude(),
                                                location.getLongitude())))
                                        .setIcon(icon);
                                mapboxMap.setCameraPosition(new CameraPosition.Builder()
                                        .target(new LatLng(
                                                location.getLatitude(),
                                                location.getLongitude()))
                                        .zoom(5)
                                        .build());
                            }
                        });

                        Call call = RetrofitClient.getClient().getLocations();
                        call.enqueue(new Callback() {
                            @Override
                            public void onResponse(Call call, Response response) {

                                    List<PeopleAPIModel> list = (List<PeopleAPIModel>) response.body();
//                                    Log.i("RESPONSE : ", response.body().toString());
                                    List<LatLng> locations = new ArrayList<>();

                                    for (PeopleAPIModel item : list) {

                                        if(item.getLastLocation().size() == 0){
                                            continue;
                                        }
                                        if(item.getLastLocation() == null){
                                            continue;
                                        }
                                        locations.add(new LatLng(
                                                item.getLastLocation().get(0), item.getLastLocation().get(1)
                                        ));
                                    }

                                    for (LatLng location : locations) {
                                        if(location == null){
                                            continue;
                                        }
                                        mapboxMap.addMarker(new MarkerOptions()
                                                .position(new LatLng(
                                                        location.getLatitude(),
                                                        location.getLongitude())));
                                            Map<String, Object> map = new HashMap<>();
                                            map.put("type", "Feature");
                                            Map<String, Object> geometryMap = new HashMap<>();
                                            geometryMap.put("type", "Point");
                                            List<Double> coordinates = new ArrayList<>();
                                            coordinates.add(location.getLongitude());
                                            coordinates.add(location.getLatitude());
                                            geometryMap.put("coordinates", coordinates);
                                            map.put("geometry", geometryMap);

                                            geoList.add(map);
                                    }

                                Map<String, Object> finalMap = new HashMap<>();
                                finalMap.put("features", geoList);
                                finalMap.put("type", "FeatureCollection");

                                collection = new JSONObject(finalMap);
                                Log.e("COLLECTION CHECK : ", collection.toString());

                                addClusteredGeoJsonSource(style, collection);
                                style.addImage(
                                        "cross-icon-id",
                                        BitmapUtils.getBitmapFromDrawable(getResources().getDrawable(R.drawable.ic_add_a_photo_white_24dp)),
                                        true
                                );


                            }

                            @Override
                            public void onFailure(Call call, Throwable t) {

                            }
                        });

                    }
                });
            }
        });



        return root;
    }

    private void addClusteredGeoJsonSource(@NonNull Style loadedMapStyle, JSONObject collection) {

// Add a new source from the GeoJSON data and set the 'cluster' option to true.
        Log.e("COLLECTION CHECK : ", collection.toString());
        try {
            loadedMapStyle.addSource(
                    new GeoJsonSource("markers",
                            collection.toString(),
//                            new URI("https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"),
                            new GeoJsonOptions()
                                    .withCluster(true)
                                    .withClusterMaxZoom(14)
                                    .withClusterRadius(50)
                    )
            );
        } catch (Exception e) {
            Log.e("ERROR AARI HAI DEKHO : ", e.getMessage());
        }

//Creating a marker layer for single data points
        SymbolLayer unclustered = new SymbolLayer("unclustered-points", "markers");

//        unclustered.setProperties(
//                iconImage("cross-icon-id")
//                ,
//                iconColor(
//                        interpolate(exponential(1), get("mag"),
//                                stop(2.0, rgb(0, 255, 0)),
//                                stop(4.5, rgb(0, 0, 255)),
//                                stop(7.0, rgb(255, 0, 0))
//                        )
//                )
//        );
//        unclustered.setFilter(has("mag"));
        loadedMapStyle.addLayer(unclustered);

// Use the earthquakes GeoJSON source to create three layers: One layer for each cluster category.
// Each point range gets a different fill color.
        int[][] layers = new int[][] {
                new int[] {150, ContextCompat.getColor(getActivity(), R.color.red)},
                new int[] {20, ContextCompat.getColor(getActivity(), R.color.green)},
                new int[] {0, ContextCompat.getColor(getActivity(), R.color.mapbox_blue)}
        };

        for (int i = 0; i < layers.length; i++) {
//Add clusters' circles
            CircleLayer circles = new CircleLayer("cluster-" + i, "markers");
            circles.setProperties(
                    circleColor(layers[i][1]),
                    circleRadius(18f)
            );

            Expression pointCount = toNumber(get("point_count"));

            circles.setFilter(
                    i == 0
                            ? all(has("point_count"),
                            gte(pointCount, literal(layers[i][0]))
                    ) : all(has("point_count"),
                            gte(pointCount, literal(layers[i][0])),
                            lt(pointCount, literal(layers[i - 1][0]))
                    )
            );
            loadedMapStyle.addLayer(circles);
        }

//Add the count labels
        SymbolLayer count = new SymbolLayer("count", "markers");
        count.setProperties(
                textField(Expression.toString(get("point_count"))),
                textSize(12f),
                textColor(Color.WHITE),
                textIgnorePlacement(true),
                textAllowOverlap(true)
        );
        loadedMapStyle.addLayer(count);
    }

    @Override
    public void onStart() {
        super.onStart();
        mapView.onStart();
    }

    @Override
    public void onResume() {
        super.onResume();
        mapView.onResume();
    }

    @Override
    public void onPause() {
        super.onPause();
        mapView.onPause();
    }

    @Override
    public void onStop() {
        super.onStop();
        mapView.onStop();
    }

    @Override
    public void onLowMemory() {
        super.onLowMemory();
        mapView.onLowMemory();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        mapView.onDestroy();
    }

    @Override
    public void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        mapView.onSaveInstanceState(outState);
    }
}