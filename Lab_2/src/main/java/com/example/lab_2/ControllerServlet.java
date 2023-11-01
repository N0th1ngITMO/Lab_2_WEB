package com.example.lab_2;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "MyServlet", value = "/controller")
public class ControllerServlet extends HttpServlet {
    private String message;

    public void init() {
        message = "Hello World!";
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        long start = System.nanoTime();
        req.setAttribute("TimeCompliting" , start);
        System.out.println(req.getHeader("Content-Type"));
        if(req.getHeader("Content-Type").equals("page_load")){
            String data;
            if(DotsHandler.getAllDotsInJson().length() != 0){
                data = DotsHandler.getAllDotsInJson();
                System.out.println(data);
            }else{
                data = "{\"Dots\":[]}";
            }
            resp.getWriter().append(data);
        }else if (req.getHeader("Content-Type").equals("clear")) {
            BeanComponent.clearCollection();
            resp.addHeader("Content-Type", "clear");
            resp.getWriter().append("");
        }else if(req.getHeader("Content-Type").equals("submitPage") || req.getHeader("Content-Type").equals("JSON") || req.getHeader("Content-Type").equals("recount") || req.getHeader("Content-Type").equals("submit")){
            RequestDispatcher dispatcher = req.getRequestDispatcher("/WEB-INF/areaCheck");
            dispatcher.forward(req, resp);
        }
    }

    public void destroy() {
    }
}
