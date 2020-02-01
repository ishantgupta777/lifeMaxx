package com.antailbaxt3r.disastermanagementapp.retrofit;

import com.antailbaxt3r.disastermanagementapp.models.PeopleAPIModel;

import java.util.List;
import java.util.Map;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Query;

public interface ApiInterface {

    @GET("safePeople")
    Call<List<PeopleAPIModel>> getPerson();

    @POST("form")
    Call<PeopleAPIModel> sendPerson(@Body Map<String,Object> body);

    @GET("unsafePeople")
    Call<List<PeopleAPIModel>> getLocations();
}
