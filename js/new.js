let teamSelector = document.getElementById("team");
let positionSelector = document.getElementById("position");

fetch('https://backend-final-despliegue.herokuapp.com/players', 
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
        for(let team of data["teams"])
        {
            row+="<option value='"+team+"'>"+team+"</option>"
        }
        teamSelector.innerHTML = row;
        row = "";
        for(let position of data["positions"])
        {
            row+="<option value='"+position+"'>"+position+"</option>"
        }
        positionSelector.innerHTML = row;
    })
.catch(error => console.log(error));

document.getElementById("form").addEventListener('submit', async (e) => 
{
    e.preventDefault();
    formElements = document.getElementById("form").elements;
    playerData = 
    {
        'name':formElements["name"].value,
        'surname':formElements["surname"].value,
        'age':formElements['age'].value,
        'team':formElements['team'].value,
        'position':formElements['position'].value
    }
    await fetch('https://backend-final-despliegue.herokuapp.com/players', 
    {
        method: "POST",
        headers: 
        {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(playerData),
    })
    .then(response => 
    {
        window.location = ("./index.html");
    })
    .catch(error => console.log(error));
})