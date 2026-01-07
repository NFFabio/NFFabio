import express from  'express'
import * as art from './muesum'
import * as users from './users'

const app = express();
const port =3000;
for(let i = 0; i < art.Museum.length; i++) {
    console.log(art.Museum[i]);
}
app.get('/muesum',(__req,res)=>{
    let answer = {
        'artMuseum': art.Museum
    }
    res.send(answer)
})
app.get('/muesum/:artpiece',(req,res)=>{
    let id = parseInt(req.params.artpiece);
    console.log(id)
    let Error={
        Error:"false parameter"
    }
    if(id>0&&id<11){
let answer = {
        'artMuseum': art.Museum[id]
    }
    res.send(answer)

    }
else{
    res.send(Error)
}
})

app.use(express.json())
app.post('/authentification',(req,res)=>{
    let uname = req.body.name;
    let up = req.body.password;

    let answer={
        c:"concrats"
    }

    for (let index = 0; index < users.payedC.length; index++) {
        if(users.payedC[index].name === uname&&users.payedC[index].password === up){
            res.send(answer)
        }
    }
    res.send({
        Error:"Wrong username or password"
    })
})
app.use(express.static(__dirname+"/../public"))
app.listen(port, ()=>{
    console.log('************ Server gestartet ************');
    console.log(`Erreichbar unter http://localhost:${port}`);
})
