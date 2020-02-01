package com.antailbaxt3r.disastermanagementapp.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

public class PeopleAPIModel {

    @SerializedName("relatives")
    @Expose
    private List<PeopleAPIModel> relatives = null;
    @SerializedName("lastLocation")
    @Expose
    private List<Double> lastLocation = null;
    @SerializedName("foundLost")
    @Expose
    private String foundLost;
    @SerializedName("_id")
    @Expose
    private String id;
    @SerializedName("name")
    @Expose
    private String name;
    @SerializedName("age")
    @Expose
    private Object age;
    @SerializedName("number")
    @Expose
    private String number;
    @SerializedName("rescueCentre")
    @Expose
    private String rescueCentre;
    @SerializedName("image")
    @Expose
    private String image;
    @SerializedName("createdAt")
    @Expose
    private String createdAt;
    @SerializedName("updatedAt")
    @Expose
    private String updatedAt;
    @SerializedName("__v")
    @Expose
    private Integer v;


    public String getFoundLost() {
        return foundLost;
    }

    public void setFoundLost(String foundLost) {
        this.foundLost = foundLost;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Object getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getRescueCentre() {
        return rescueCentre;
    }

    public void setRescueCentre(String rescueCentre) {
        this.rescueCentre = rescueCentre;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Integer getV() {
        return v;
    }

    public List<PeopleAPIModel> getRelatives() {
        return relatives;
    }

    public void setRelatives(List<PeopleAPIModel> relatives) {
        this.relatives = relatives;
    }

    public List<Double> getLastLocation() {
        return lastLocation;
    }

    public void setLastLocation(List<Double> lastLocation) {
        this.lastLocation = lastLocation;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public void setV(Integer v) {
        this.v = v;
    }

}
