<%@ page import="com.example.lab_2.BeanComponent" %>
<%@ page import="com.google.gson.JsonObject" %>
<%@ page import="java.util.HashMap" %><%--
  Created by IntelliJ IDEA.
  User: dimak
  Date: 11/1/2023
  Time: 12:47 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core" %>>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <title>Лабораторная работа №2</title>
    <link rel="stylesheet" href="stylesForSubmitPage.css"/>
    <script src="scriptForSubmitPage.js"></script>
</head>
<body>
<div class="header">
    <div class="name">
        <p>Комягин Дмитрий Анатольевич, группа Р3232, вариант 1306</p>
    </div>
</div>
<div class="grafic">
    <div id="table" style="overflow: auto;">
        <table class="resultsTable" border="1" cellpadding="7" cellspacing="0" width="100%" >
            <caption style="font: small-caps bold 22px/1 sans-serif;">Таблица результатов</caption>
            <thead>
            <tr >
                <th>X</th>
                <th>Y</th>
                <th>Радиус</th>
                <th>Текущее время</th>
                <th>Время выполнения</th>
                <th>Результат</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <%
                    HashMap json = BeanComponent.getMyDotsCollection();
                    JsonObject j = (JsonObject) json.get(json.size());
                %>
                <td><%=j.get("X")%></td>
                <td><%=j.get("Y")%></td>
                <td><%=j.get("R")%></td>
                <td><%=j.get("Timezone")%></td>
                <td><%=j.get("TimeCompliting")%></td>
                <td><%=j.get("HitCheck")%></td>
            </tr>
            </tbody>
        </table>
    </div>
</div>

<div class="units_area">
    <ol><button type="button" id="backButton" onclick="backToTheRoots()">Вернуться назад</button></ol>
</div>
</body>
</html>
