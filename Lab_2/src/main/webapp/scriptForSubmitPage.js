const method = "POST";
let URL = "http://localhost:8080/Lab_2-1.0-SNAPSHOT/controller";
var y;
var x;
var r;
var data;
function onLoad() {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        request.onload = () => {
            const table = document.querySelector('.resultsTable').querySelector('tbody');
            try {
                data = JSON.parse(request.responseText)
                console.log(data)
                let row = "<tr>" +
                    "<td>" + data.X + "</td>" +
                    "<td>" + data.Y + "</td>" +
                    "<td>" + data.R + "</td>" +
                    "<td>" + data.Timezone + "</td>" +
                    "<td>" + data.TimeCompliting + "</td>" +
                    "<td>" + data.HitCheck + "</td>" +
                    "<tr>";
                const table = document.querySelector('.resultsTable').querySelector('tbody');
                table.innerHTML = row;
            }catch(e){
                if (e instanceof SyntaxError){
                }
            }
        }
    }

    request.onerror = function () {
        console.log(`Server error: ${request.status}`);
    }
    request.open(method, URL, false);
    request.setRequestHeader('Content-Type', 'submitPage')
    request.send();
}

function backToTheRoots(){
    window.location.href = 'index.jsp';
}