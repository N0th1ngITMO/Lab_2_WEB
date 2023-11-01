const method = "POST";
let URL = "http://localhost:8080/Lab_2-1.0-SNAPSHOT/controller";
var y;
var x;
var r;
var data;
let data2;
function onLoad() {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        request.onload = () => {
            const table = document.querySelector('.resultsTable').querySelector('tbody');
            try {
                data = JSON.parse(request.responseText)
                console.log(data)
                console.log(data)
                r = data.Dots[data.Dots.length-1].R
                if(r != null){
                    document.getElementById("R_place").querySelector(`[value = \"${r}\"]`).click();
                    innerTable(data);
                }
            }catch(e){
                if (e instanceof SyntaxError){
                    data = JSON.parse("{\"Dots\":[]}");
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

function drawDot(data){
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        w = canvas.width,
        h=canvas.height;
    const table = document.querySelector('.resultsTable').querySelector('tbody');
    console.log(data);
    for (i = 0; i < data.Dots.length; i++){
        var mouse = { x:0, y:0};
        mouse.x = data.Dots[i].X*34 + 208;
        mouse.y = data.Dots[i].Y*(-25.655) + 160;
        draw = true;
        if(data.Dots[i].HitCheck == "Hit"){
            context.fillStyle = "rgb(0, 255, 0)";
            console.log('green')
        }else{
            context.fillStyle = "rgb(255, 0, 0)";
        };
        context.beginPath();
        context.arc(mouse.x, mouse.y, 4, 0, 360, false);
        context.closePath();
        context.fill()
        draw = false;
    }
}

function innerTable(data){
    let row = "";
    const table = document.querySelector('.resultsTable').querySelector('tbody');
    for (i = 0; i < data.Dots.length; i++){
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

function sendRequest(contentType) {
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
            console.log(data);
            data.Dots.push(JSON.parse(xhr.responseText));
            const curDot = data.Dots[data.Dots.length - 1];
            var canvas = document.getElementById("canvas"),
                context = canvas.getContext("2d"),
                w = canvas.width,
                h = canvas.height;

            var mouse = {x: 0, y: 0};
            mouse.x = curDot.X * 34 + 208;
            mouse.y = curDot.Y * (-25.655) + 160;
            draw = true;
            if (curDot.HitCheck == "Hit") {
                context.fillStyle = "rgb(0, 255, 0)";

            } else {
                context.fillStyle = "rgb(255, 0, 0)";
            }
            context.beginPath();
            context.arc(mouse.x, mouse.y, 4, 0, 360, false);
            context.closePath();
            context.fill()
            draw = false;

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
        sendRequest("submit");
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
        var test = document.getElementById('canvas')
        var c = test.getContext('2d');
        var pic = new Image();
        try {
            var rates = document.querySelector("input[name=contact]:checked").value;
            console.log(rates);
            if(rates == '1'){
                r = document.getElementById('contactChoice1').value;
                c.reset();
                pic.src = 'drawing_r=1.svg';
                pic.onload = function(){
                    c.drawImage(pic, 0, 0);
                }

            }else if(rates == '2'){
                r = document.getElementById('contactChoice2').value;
                c.reset();
                pic.src = 'drawing_r=2.svg';
                pic.onload = function(){
                    c.drawImage(pic, 0, 0);
                }

            }else if(rates == '3'){
                r = document.getElementById('contactChoice3').value;
                c.reset();
                pic.src = 'drawing_r=3.svg';
                pic.onload = function(){
                    c.drawImage(pic, 0, 0);
                }

            } else if(rates == '4'){
                r = document.getElementById('contactChoice4').value;
                c.reset();
                pic.src = 'drawing_r=4.svg';
                pic.onload = function(){
                    c.drawImage(pic, 0, 0);
                }

            } else if(rates == '5'){
                r = document.getElementById('contactChoice5').value;
                c.reset();
                pic.src = 'drawing_r=5.svg';
                pic.onload = function(){
                    c.drawImage(pic, 0, 0);
                }
            }
        }catch (e){
            if(e instanceof TypeError){
                pic.src = 'для димы.svg';
                pic.onload = function(){
                    c.drawImage(pic, 0, 0);
                }
            }
        }
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

    var test = document.getElementById('canvas')
    var c = test.getContext('2d');
    var pic = new Image();
    pic.src = 'для димы.svg';
    pic.onload = function(){
        c.drawImage(pic, 0, 0);
    }
    document.getElementById('R_place').addEventListener('click', function (e){
        try{
            var rates = document.querySelector("input[name=contact]:checked").value;

            if(rates == '1'){
                r = document.getElementById('contactChoice1').value;
                c.reset();
                pic.src = 'drawing_r=1.svg';
                c.drawImage(pic, 0, 0);

            }else if(rates == '2'){
                r = document.getElementById('contactChoice2').value;
                c.reset();
                pic.src = 'drawing_r=2.svg';
                c.drawImage(pic, 0, 0);

            }else if(rates == '3'){
                r = document.getElementById('contactChoice3').value;
                c.reset();
                pic.src = 'drawing_r=3.svg';
                c.drawImage(pic, 0, 0);

            } else if(rates == '4'){
                r = document.getElementById('contactChoice4').value;
                c.reset();
                pic.src = 'drawing_r=4.svg';
                c.drawImage(pic, 0, 0);

            } else if(rates == '5'){
                r = document.getElementById('contactChoice5').value;
                c.reset();
                pic.src = 'drawing_r=5.svg';
                c.drawImage(pic, 0, 0);
            }
            setTimeout(() => {
                console.log(data!=="");
                if(data != null && data !== ""){
                    const request = new XMLHttpRequest();
                    request.onload = () => {
                        const table = document.querySelector('.resultsTable').querySelector('tbody');
                        try{
                            let json = JSON.parse(request.responseText);
                            data2 = data;
                            for(let i = 0; i <= json.DotsHits.length; i++){
                                data2.Dots[i].HitCheck = json.DotsHits[i].HitCheck;
                            }
                        }catch (e){
                            if(e instanceof SyntaxError){
                                data2 = JSON.parse("{\"Dots\":[]}");
                            }
                        }
                        console.log(data)
                        console.log(data2)
                    };
                    request.onerror = function () {
                        console.log(`Server error: ${request.status}`);
                    }
                    request.open(method, URL, false);
                    request.setRequestHeader('Content-Type', 'recount')
                    request.send(r);
                    drawDot(data2);
                }
            }, 100);
        }catch (e){
            if(r instanceof TypeError){}
        }
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
