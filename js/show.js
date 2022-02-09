function getParameterByName(name, url = window.location.href) 
{
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
fetch('https://backend-final-despliegue.herokuapp.com/players/' + getParameterByName('id'), 
{
    method: "GET",
    headers: 
    {
        Accept: "application/json",
        "Content-Type": "application/json",
    }
})
.then(response => response.json())
.then(data =>
    {
        let row = "";
        row+='<h1>'+data["name"]+' '+data["surname"]+'</h1>';
        row+='<p>Edad: '+data["age"]+'</p>';
        row+='<p>Equipo: '+data["team"]+'</p>';
        row+='<p>Posición: '+data["position"]+'</p>';
        row+='<a href="./edit.html?id='+getParameterByName('id')+'"><button>Edit</button></a><br>';
        row+='<button id="delete" onclick="deletePlayer()">Delete</button><br>';
        row+='<a href="./index.html"><button>Go back to Players</button></a>';
        document.getElementById("containRightData").innerHTML = row;
    })
.catch(error => console.log(error));
function deletePlayer()
{
    fetch('https://backend-final-despliegue.herokuapp.com/players/' + getParameterByName('id') + '?_method=DELETE', 
    {
        method: "POST",
        headers: 
        {
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    })
    .then(response => 
        {
            window.location = './index.html';
        })
    .catch(error => console.log(error));
}