function getParameterByName(name, url = window.location.href) 
{
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
let loaded = false;
fetch('http://localhost:3001/players/' + getParameterByName('id') + '/edit', 
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
    let row = "<h1>Create new player</h1>";
    row+= '<form id="form">';
    row+= '<input type="text" name="name" placeholder="Name" value="'+data["player"]["name"]+'" required><br>';
    row+= '<input type="text" name="surname" placeholder="Sunames" value="'+data["player"]["surname"]+'" required><br>';
    row+= '<input type="number" name="age" placeholder="Age" value="'+data["player"]["age"]+'" required min="16"><br>';
    row+= '<select name="team">';
    for(let team of data["teams"]) 
    {
        row+='<option value="'+team+'"';
        data["team"] === team ? 'selected':'' 
        row+='>'+team+'</option>>';
    }
    row+= '</select><br><select name="position">';
    for(let position of data["positions"]) 
    {
        row+='<option value="'+position+'"';
        data["position"] === position ? 'selected':'' 
        row+='>'+position+'</option>>';
    }
    row+='</select><br><button>Edit</button><br></form><a href="./show.html?id='+getParameterByName('id')+'"><button>Go Back</button></a>';
    document.getElementById("containerRightData").innerHTML = row;
    document.getElementById("form").addEventListener('submit', async (e) =>
    {
        e.preventDefault();
        let formElements = document.getElementById("form").elements;
        data = 
        {
            'name':formElements["name"].value,
            'surname':formElements["surname"].value,
            'age':formElements['age'].value,
            'team':formElements['team'].value,
            'position':formElements['position'].value
        }
        await fetch('http://localhost:3001/players/'+getParameterByName('id')+'?_method=PUT', 
        {
            method: "POST",
            headers: 
            {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then(window.location = ('./show.html?id='+getParameterByName('id')))
        .catch(error => console.log(error));
    }) 
})
.catch(error => console.log(error));