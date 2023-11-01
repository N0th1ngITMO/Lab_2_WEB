package com.example.lab_2;

import com.google.gson.JsonObject;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Objects;

public class BeanComponent implements Serializable {
    private static HashMap<Integer, JsonObject> myDotsCollection = new HashMap<>();
    private static JsonObject currentDot;
    private static Integer countOfDots = 0;
    public BeanComponent() {
    }

    public static Integer getCountOfDots() {
        return countOfDots;
    }

    public static void setCountOfDots(Integer a) {
        countOfDots = a;
    }

    public static void incCounter(){
        countOfDots++;
    }
    public static HashMap<Integer, JsonObject> getMyDotsCollection(){
        return myDotsCollection;
    }
    public static void setMyDotsCollection(JsonObject dotData){
        incCounter();
        myDotsCollection.put(getCountOfDots(), dotData);
        setCurrentDot(dotData);
    }
    public static JsonObject getCurrentDot(){
        return currentDot;
    }

    public static void setCurrentDot(JsonObject dotData) {
        currentDot = dotData;
    }

    public static void clearCollection(){
        myDotsCollection.clear();
        currentDot = null;
        countOfDots = 0;
    }
}
