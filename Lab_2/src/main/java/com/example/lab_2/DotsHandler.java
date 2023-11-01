package com.example.lab_2;

import com.google.gson.JsonObject;

public class DotsHandler {
    public static String getAllDotsInJson(){
        Integer count = BeanComponent.getCountOfDots();
        String data = "{\"Dots\":[";
        for(int i = 1; i<=count; i++){
            if(i != count){
                data += BeanComponent.getMyDotsCollection().get(i).toString() + ",";
            }else {
                data += BeanComponent.getMyDotsCollection().get(i).toString() + "]}";
            }
        }
        return data;
    }
}
