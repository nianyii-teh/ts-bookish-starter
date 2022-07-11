import { rejects } from 'assert';
import { Connection, Request as RequestStatement } from 'tedious';
//const Connection = require('tedious').Connection;

let connection;

const config = {
    server: 'localhost',
    authentication: {
        type: 'default',
        options: {
            userName: 'DanLeb',
            password: 'TestPassword123',
        },
    },
    options: {
        port: 1433,
        database: 'bookish',
        trustServerCertificate: true,
        rowCollectionOnRequestCompletion: true,
    },
};

export function setupConnection() {
    connection = new Connection(config);

    // Setup event handler when the connection is established
    connection.on('connect', function (err) {
        if (err) {
            console.log('Error: ' + err);
        }

        console.log('Connected successfully');
    });

    connection.connect();
}

export function executeStatement(sqlQuery: string) {
    const request = new RequestStatement(sqlQuery, function (err, rowCount) {
        if (err) {
            console.log(err);
        } else {
            console.log(rowCount + ' rows');
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

        request.on('error', (error) => reject(error));
        request.on('doneProc', () => resolve(result));

        connection.execSql(request);
    });
}
