const method = "POST";
let URL = "http://localhost:8080/Lab_2-1.0-SNAPSHOT/controller";
let y;
let x;
let r;
let data;
let data2;
let curDot;
let calculator;
function onLoad() {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        request.onload = () => {
            const table = document.querySelector('.resultsTable').querySelector('tbody');
            try {
                data = JSON.parse(request.responseText)
                console.log(data)
                r = data.Dots[data.Dots.length-1].R
                if(r != null){
                    document.getElementById("R_place").querySelector(`[value = \"${r}\"]`).click();
                    innerTable(data);
                }
            }catch(e){
                if (e instanceof SyntaxError){
                    data = JSON.parse("{\"Dots\":[]}");
                    drawNewGrafic(r);
                }
            }
        };
    }

    request.onerror = function () {
        console.log(`Server error: ${request.status}`);
    }
    request.open(method, URL, false);
    request.setRequestHeader('Content-Type', 'page_load')
    request.send();
}

function drawNewGrafic(r){
    let elt = document.getElementById('calculator');
    let options = {
        keypad: false, settingsMenu: false, expressions:false, zoomButtons: false, expressionsTopbar: false, lockViewport: true,
        xAxisStep: 1, xAxisLabel: "X", yAxisLabel: "Y"
    };
    if(r != null) {
        if(calculator != null){
            destroyGrafic();
        }
        calculator = Desmos.GraphingCalculator(elt, options);
        calculator.setExpression({id: "line1", latex: `y>=2x-${r}\\left\\{-${r}<=y<=0\\right\\}\\left\\{0<=x\\right\\}`, color: Desmos.Colors.BLUE});
        calculator.setExpression({id: "line2", latex: `x>=-(${r}/2)\\left\\{0<=y<=${r}\\right\\}\\left\\{x<=0\\right\\}`, color: Desmos.Colors.BLUE});
        calculator.setExpression({id: "line3", latex: `y<=${r}\\left\\{y>=0\\right\\}\\left\\{-(${r}/2)<=x<=0\\right\\}`, color: Desmos.Colors.BLUE});
        calculator.setExpression({id: "line4", latex: `x^2+y^2<=(${r}/2)^2\\left\\{-5<=y<=0\\right\\}\\left\\{-5<=x<=0\\right\\}`, color: Desmos.Colors.BLUE});
    }else{
        calculator = Desmos.GraphingCalculator(elt, options);
    }
}

function destroyGrafic(){
    calculator.destroy();
}

function getCoorOfClick(data){
    if(r != null){
        let graf = document.getElementById("calculator");
        let rect = graf.getBoundingClientRect();
        let X = data.clientX - rect.left;
        let Y = data.clientY - rect.top;
        console.log(X, Y, r);
        // Note, pixelsToMath expects x and y to be referenced to the top left of
        // the calculator's parent container.
        let mathCoordinates = calculator.pixelsToMath({x: X, y: Y});
        x = mathCoordinates.x;
        y = mathCoordinates.y;
        sendRequest("JSON", function (){
            drawDot();
        })
    }
}

function drawDot(){
    let color;
    if (curDot.HitCheck == "Hit") {
        color = Desmos.Colors.GREEN;
    } else {
        color = Desmos.Colors.RED;
    }
    calculator.setExpression({
        id: curDot.X + '' + curDot.Y,
        color: color,
        latex: `\\left(${curDot.X},${curDot.Y}\\right)`
    });
}

function innerTable(){
    let row = "";
    const table = document.querySelector('.resultsTable').querySelector('tbody');
    for (i = 0; i < data.Dots.length; i++){
        console.log(data.Dots[i].X)
        row = row + "<tr>" +
            "<td>" + data.Dots[i].X +"</td>" +
            "<td>" + data.Dots[i].Y +"</td>" +
            "<td>" + data.Dots[i].R +"</td>" +
            "<td>" + data.Dots[i].Timezone +"</td>" +
            "<td>" + data.Dots[i].TimeCompliting + "</td>" +
            "<td>" + data.Dots[i].HitCheck +"</td>" +
            "<tr>";
    }
    console.log(row);
    table.innerHTML = row;
}

function sendRequest(contentType, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", URL, true);
    const body = JSON.stringify({
        X: x,
        Y: y,
        R: r,
        Timezone: new Date().toLocaleTimeString()
    });
    xhr.setRequestHeader('Content-Type', contentType);
    console.log(body);
    xhr.onload = () => {
        console.log(xhr.status);
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 307)) {
            data.Dots.push(JSON.parse(xhr.responseText));
            curDot = data.Dots[data.Dots.length - 1];
            const curDotXY = {x: curDot.X, y: curDot.Y}
            console.log(curDot.X)
            let row = "<tr>" +
                "<td>" + curDot.X + "</td>" +
                "<td>" + curDot.Y + "</td>" +
                "<td>" + curDot.R + "</td>" +
                "<td>" + curDot.Timezone + "</td>" +
                "<td>" + curDot.TimeCompliting + "</td>" +
                "<td>" + curDot.HitCheck + "</td>" +
                "<tr>";
            const table = document.querySelector('.resultsTable').querySelector('tbody');
            table.insertAdjacentHTML("beforeend", row)
            console.log(xhr.responseText);
            if (xhr.status == 307) {
                window.location.href = 'submitPage.jsp';
            }
        }else{
            console.log(`Error: ${xhr.status}`);
        }
        callback();
    };
    xhr.send(body);
}

function onSubmitButtonPressed(event) {
    event.preventDefault();
    console.log('Validation status: OK')
    y = document.querySelector("#text_place").value.replace(',', '.');
    x = document.getElementById('X_coord').value;
    if(x != null && !isNaN(x) && !isNaN(y) && y.length <= 15 && y<=5 && -5<=y && r != null){
        console.log('1');
        sendRequest("submit", function (){
            drawDot();
        });
    }else{
        window.alert("Праверьте правильность введенных данных")
    }
}

function onClearButtonClicked(){
    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        const table = document.querySelector('.resultsTable').querySelector('tbody');
        table.innerHTML = '';
        console.log(request.responseText);
        drawNewGrafic(r);
        data = JSON.parse("{\"Dots\":[]}");
    }

    request.onerror = function () {
        console.log(`Server error: ${request.status}`);
    }
    request.open(method, URL, false);
    request.setRequestHeader('Content-Type', 'clear')
    request.send();

}

document.addEventListener('DOMContentLoaded', ()=>{
    const form = document.getElementById("form_place");
    form.addEventListener("submit", e => onSubmitButtonPressed(e));

    document.getElementById('R_place').addEventListener('click', function (e){
        console.log(data);
        r = parseInt(document.querySelector("input[name=contact]:checked").value);
        drawNewGrafic(r);
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
            const table = document.querySelector('.resultsTable').querySelector('tbody');
            try{
                let json = JSON.parse(xhr.responseText);
                data2 = data;
                for(let i = 0; i < json.DotsHits.length; i++){
                    data2.Dots[i].HitCheck = json.DotsHits[i].HitCheck;
                }
                for (let i = 0; i < data2.Dots.length; i++){
                    curDot = data2.Dots[i];
                    drawDot();
                }
            }catch (e){
                if(e instanceof SyntaxError){
                    data2 = JSON.parse("{\"Dots\":[]}");
                }
            }
        };
        xhr.onerror = function () {
            console.log(`Server error: ${xhr.status}`);
        }
        xhr.open("POST", URL, true);
        xhr.setRequestHeader('Content-Type', "recount");
        xhr.send(r);
    });


    const checkboxButtons = document.querySelectorAll('.checkbox_but');
    checkboxButtons.forEach(function(checkbox) {
        checkbox.addEventListener("change", function() {
            if (this.checked) {
                checkboxButtons.forEach(function(otherCheckbox) {
                    if (otherCheckbox !== checkbox) {
                        otherCheckbox.checked = false;
                    }
                });
            }
        });
    });
});
