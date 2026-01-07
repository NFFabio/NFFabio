"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const art = __importStar(require("./muesum"));
const users = __importStar(require("./users"));
const app = (0, express_1.default)();
const port = 3000;
for (let i = 0; i < art.Museum.length; i++) {
    console.log(art.Museum[i]);
}
app.get('/muesum', (__req, res) => {
    let answer = {
        'artMuseum': art.Museum
    };
    res.send(answer);
});
app.get('/muesum/:artpiece', (req, res) => {
    let id = parseInt(req.params.artpiece);
    console.log(id);
    let Error = {
        Error: "false parameter"
    };
    if (id > 0 && id < 11) {
        let answer = {
            'artMuseum': art.Museum[id]
        };
        res.send(answer);
    }
    else {
        res.send(Error);
    }
});
app.use(express_1.default.json());
app.post('/authentification', (req, res) => {
    let uname = req.body.name;
    let up = req.body.password;
    let answer = {
        c: "concrats"
    };
    for (let index = 0; index < users.payedC.length; index++) {
        if (users.payedC[index].name === uname && users.payedC[index].password === up) {
            res.send(answer);
        }
    }
    res.send({
        Error: "Wrong username or password"
    });
});
app.use(express_1.default.static(__dirname + "/../public"));
app.listen(port, () => {
    console.log('************ Server gestartet ************');
    console.log(`Erreichbar unter http://localhost:${port}`);
});
