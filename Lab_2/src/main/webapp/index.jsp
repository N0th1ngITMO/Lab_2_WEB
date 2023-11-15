<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core" %>>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ru">
<head>

    <meta charset="utf-8">
    <title>Лабораторная работа №2</title>
    <link rel="stylesheet" href="styles.css"/>
    <script src="script.js"></script>
    <script src="https://www.desmos.com/api/v1.8/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6"></script>
</head>
<body onload="onLoad()">
<div class="header">
    <div class="name">
        <p>Комягин Дмитрий Анатольевич, группа Р3232, вариант 1306</p>
    </div>
</div>

<div class="grafic">
    <div id="calculator" onclick="getCoorOfClick(event)"></div>

    <div id="table" style="overflow: auto;">
        <table class="resultsTable" border="1" cellpadding="7" cellspacing="0" >
            <caption style="font: small-caps bold 2vw/1 sans-serif;">Таблица результатов</caption>
            <thead style="font-size: 1vw">
            <tr >
                <th>X</th>
                <th>Y</th>
                <th>Радиус</th>
                <th>Текущее время</th>
                <th>Время выполнения</th>
                <th>Результат</th>
            </tr>
            </thead>
            <tbody style="font-size: 1vw">
            </tbody>
        </table>
        <ol><button type="button" id="clearTableButton" onclick="onClearButtonClicked()">Очистить таблицу</button></ol>
    </div>
</div>
<div class="units_area">
    <form id="form_place">
        <div id="X_place">
            <fieldset>
                <legend>Выберите координату X:</legend>
                <select name="X_coord" id="X_coord">
                    <option>select X coordinate</option>
                    <option style="border: 1px solid #000000">-3</option>
                    <option>-2</option>
                    <option>-1</option>
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
            </fieldset>
        </div>

        <div id="Y_place">
            <fieldset>
                <legend>Выберите координату Y:</legend>
                <input type="text" id="text_place" placeholder="Координаты Y">
            </fieldset>
        </div>

        <div id="R_place">
            <fieldset>
                <legend>Выберите значение R:</legend>
                <div>
                    <input type="radio" id="contactChoice1" name="contact" value="1" />
                    <label for="contactChoice1">1</label>

                    <input type="radio" id="contactChoice2" name="contact" value="2" />
                    <label for="contactChoice2">2</label>

                    <input type="radio" id="contactChoice3" name="contact" value="3" />
                    <label for="contactChoice3">3</label>

                    <input type="radio" id="contactChoice4" name="contact" value="4" />
                    <label for="contactChoice3">4</label>

                    <input type="radio" id="contactChoice5" name="contact" value="5" />
                    <label for="contactChoice3">5</label>
                </div>
            </fieldset>
        </div>
        <ol id="am"><input type="submit" id="submit_but" value="Отправить"></ol>
    </form>
</div>
</body>
</html>