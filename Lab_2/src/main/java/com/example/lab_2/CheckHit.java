package com.example.lab_2;

import com.google.gson.JsonObject;

import java.util.List;

public class CheckHit {
    public static String checkHit(JsonObject data, Double r) {
        double x;
        double y;
        if(data.get("X").toString().charAt(data.get("X").toString().length() - 1) == '\"'){
            x = Double.parseDouble(data.get("X").toString().substring(1, data.get("X").toString().length()-1));
        }else{
            x = Double.parseDouble(data.get("X").toString());
        }

        if(data.get("Y").toString().charAt(data.get("Y").toString().length() - 1) == '\"'){
            y = Double.parseDouble(data.get("Y").toString().substring(1, data.get("Y").toString().length()-1));
        }else{
            y = Double.parseDouble(data.get("Y").toString());
        }


        if(x <=0 && x >= (r/(-2)) && 0<=y && y<=r){
            return "Hit";
        } else if (x <= 0 && y <= 0 && Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(r/2, 2)){
            return "Hit";
        } else if (x >= 0 && y <= 0) {
            double d = x * r - (y + r)*( r /2);
            if(d <= 0){
                return "Hit";
            }else {
                return "Miss";
            }
        }else{
            return "Miss";
        }
    }
}
