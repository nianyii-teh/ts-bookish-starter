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
        //executeStatement();
    });

    connection.connect();
}



export function executeStatement(sqlQuery: string){
    console.log("Connection Established");
    let request = new RequestStatement(sqlQuery, function(err, rowCount){
        if(err){
            console.log(err);
        } else{
            console.log(rowCount + " rows");
        }
    });
    connection.execSql(request);
    return request;
    // request.on('row', function(columns){
    //     console.log(columns);
    //     columns.forEach(column => {
    //         console.log(column.value);
    //     });
    // });
    
}
