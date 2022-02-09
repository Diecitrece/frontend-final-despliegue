//fetch
fetch('http://localhost:3001/players', 
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
        let players = data["players"];
        let teams = data["teams"];
        let positions = data["positions"];
        
        //Rellenar playersContainer

        let playersContainer = document.getElementById("playersContainer");
        row = "<ul>";
        for(let player of players) 
        {
            row += "<li>"+player['name']+ " " + player['surname'] + "-" + player["team"];
            row += "<ul><li><a href='./show.html?id="+player['_id']+"'><button>Detalles</button></a></li></ul></li>";
        }
        row += "</ul>";
        playersContainer.innerHTML = row;
    })
.catch(error => console.log(error));