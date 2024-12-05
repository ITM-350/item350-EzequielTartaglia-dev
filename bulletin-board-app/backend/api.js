var eventsData = [
  { date: "2017-11-21", detail: "Linuxing in London", id: 1, title: "Docker Workshop" },
  { date: "2017-11-21", detail: "WinOps London", id: 2, title: "WinOps #17" },
  { date: "2017-11-13", id: 3, title: "Docker London" }
];

exports.events = function (req, res) {
  res.json(eventsData); 
};

exports.event = function (req, res) {
  const eventId = req.params.eventId; 
  const event = eventsData[eventId]; 
  if (event) {
    res.json(event);
  } else {
    res.json(undefined); 
  }
};

const statusCodes = require('http'). STATUS_CODES;
const httpConstants = require('http2').constants;
Cree una instancia de un cliente de documentos de DynamoDB con el SDK
const { docClient, getCommand, deleteCommand, putCommand, scanCommand } = require("./aws");

exports.events = function (req, res) {
let id = req.query.id;
if (id) {
getCommand.input.Key.id = Number(id);
docClient.send(getCommand).then(
(data) => {
res.send(data. Artículo);
},
(error) => {
console.log(error);
res.send(error);
}
);
} else {

docClient.send(scanCommand).then(
(datos) => {
res.json(datos. Artículos);
},
(error) => {
console.log(error);
res.send(error);
        }
      );
  }
};

exports.event = function (req, res) {
let body = req.body;
let id = req.params.eventId;
if (id && req.method === httpConstants.HTTP2_METHOD_DELETE) {

deleteCommand.input.Key.id = Number(id);
docClient.send(deleteCommand).then(
(datos) => {
res.send(datos);
},
(error) => {
console.log("error de eliminación" + error);
res.send(error);
}
);
} else if (req.method === httpConstants.HTTP2_METHOD_POST && body.title.trim()) {
body.id = Date.now();
// Crea un objeto JSON con parámetros para DynamoDB y guárdalo en una variable
let params = {
TableName:'event',
Item: body
};
// escribe en la tabla
de DynamoDB putCommand.input.Item = body;
docClient.send(putCommand).then(
(datos) => {
res.send(datos);
},
(error) => {
console.log("error de put" + error);
res.send(error);
            }
        );
  }
  };
  
