import { rejects } from "assert";
import { resolve } from "path";

const Connection = require('tedious').Connection;
const RequestStatement = require('tedious').Request;
let connection;

export function setupConnection(portVal){
    const config = {
        "server": "localhost",
        "authentication": {
          "type": "default",
          "options": {
            "userName": "DanLeb",
            "password": "TestPassword123"
          }
        },
        "options": {
          "port": 1433,
          "database": "bookish",
          "trustServerCertificate": true
        }
      }

    connection = new Connection(config);

    // Setup event handler when the connection is established
    connection.on('connect', function(err){
        if(err){
            console.log("Error: " + err);
        }

        console.log("Connected successfully");
    });

    connection.connect();
}



export function executeStatement(sqlQuery: string){
    let request = new RequestStatement(sqlQuery, function(err, rowCount){
        if(err){
            console.log(err);
        } else{
            console.log(rowCount + " rows");
        }
    });

    return new Promise((resolve, reject) => {
      const result = [];

      request.on('row', (columns) => {
        const entry = {};
        columns.forEach((column) => {
          entry[column.metadata.colName] = column.value;
        });
        result.push(entry);
      });

      request.on('error', error => rejects(error));
      request.on('doneProc', () => resolve(result));
      

      connection.execSql(request);
    });
}
