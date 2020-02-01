package com.antailbaxt3r.disastermanagementapp.retrofit;

import com.antailbaxt3r.disastermanagementapp.models.PeopleAPIModel;
import com.google.gson.JsonObject;

import org.json.JSONObject;

import java.util.List;
import java.util.Map;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Query;
import retrofit2.http.QueryMap;

public interface ApiInterface {

    @GET("safePeople")
    Call<List<PeopleAPIModel>> getPerson();

    @POST("form")
    Call<PeopleAPIModel> sendPerson(@Body Map<String,Object> body);

    @GET("unsafePeople")
    Call<List<PeopleAPIModel>> getLocations();

    @GET("v1/address")
    Call<JsonObject> getCoordinates(@QueryMap Map<String, String> options);
}
