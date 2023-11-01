package com.example.lab_2;

import java.io.*;
import java.util.HashMap;


import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;

@WebServlet(name = "AreaCheckServlet", value = "/WEB-INF/areaCheck")
public class AreaCheckServlet extends HttpServlet {
    public void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        BufferedReader bufferedReader = req.getReader();
        String data = "";
        String line;
        while ((line = bufferedReader.readLine()) != null){
            data += line;
        }
        if(req.getHeader("Content-Type").equals("JSON") || req.getHeader("Content-Type").equals("submit")){
            JsonParser parser = new JsonParser();
            JsonObject jsonObject = (JsonObject) parser.parse(data);
            data = data.substring(0, data.length()-1);
            System.out.println(data);
            data += ",\"TimeCompliting\":\"" + (System.nanoTime() - (long)req.getAttribute("TimeCompliting")) + "\",\"HitCheck\":\"" + CheckHit.checkHit(jsonObject, Double.parseDouble(jsonObject.get("R").toString().substring(1, jsonObject.get("R").toString().length()-1))) + "\"}";
            jsonObject = (JsonObject) parser.parse(data);
            BeanComponent.setMyDotsCollection(jsonObject);
            bufferedReader.close();
            if(req.getHeader("Content-Type").equals("submit")){
                resp.setStatus(307);
            }
            resp.getWriter().append(data);
        }else if(req.getHeader("Content-Type").equals("recount")){
            HashMap<Integer, JsonObject> collection = BeanComponent.getMyDotsCollection();
            String json = "{\"DotsHits\":[";
            for(int i = 1; i <= collection.size(); i++){
                if(i != collection.size()){
                    json += "{\"HitCheck\":\"" + CheckHit.checkHit(collection.get(i), Double.parseDouble(data)) + "\"},";
                }else{
                    json += "{\"HitCheck\":\"" + CheckHit.checkHit(collection.get(i), Double.parseDouble(data)) + "\"}]}";
                }
            }
            System.out.println(json);
            bufferedReader.close();
            resp.getWriter().append(json);
        } else if (req.getHeader("Content-Type").equals("submitPage")) {
            System.out.println(BeanComponent.getCurrentDot().toString());
            resp.getWriter().append(BeanComponent.getCurrentDot().toString());
        }
    }
}