const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, DeleteCommand, GetCommand, PutCommand, ScanCommand } = require("@aws-sdk/lib-dynamodb");

Creación de una instancia de un cliente de documentos de DynamoDB con el SDK
const client = new DynamoDBClient({region: 'us-west-2'});
const docClient = DynamoDBDocumentClient.from(cliente);
const scanCommand = new ScanCommand({
TableName: "evento",
  });

const getCommand = new GetCommand({TableName: 'event', Key: {id: null}});

const input = {
"Key": {id: 1},
"TableName": "evento"
};
const deleteCommand = new DeleteCommand(entrada);

  const putCommand = new PutCommand({
    TableName: "event",
    Item: {
        title: 'Docker Workshop',
        detail: 'Linuxing in London ',
        date: '2017-11-21'
      },
  });

 module.exports = { docClient, getCommand, deleteCommand, putCommand, scanCommand };
