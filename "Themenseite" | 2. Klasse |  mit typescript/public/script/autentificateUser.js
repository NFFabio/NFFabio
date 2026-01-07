function callUser(){
    let uname = document.getElementById('un').value;
    let upassword = document.getElementById('up').value;

    let ud={
        name:uname,
        password:upassword
    }

    fetch(`/authentification`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(ud)
    })
    .then((response) => {
        return response.json();
    })
    .then((pokemon) => {
        console.log(pokemon);
        if(pokemon.c==="concrats"){
            window.open("./museum.html")
        }

        
    })
    .catch((error) => {
        throw error;
    });

}