import { rejects } from 'assert';
import { resolve } from 'path';
import { Connection } from 'tedious';
import { Request as RequestStatement } from 'tedious';

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

export function createStatement(sqlQuery: string) {
    const request = new RequestStatement(sqlQuery, function (err, rowCount) {
        if (err) {
            console.log(err);
        } else {
            console.log(rowCount + ' rows');
        }
    });
    return request;
}

export function executeStatement(request: RequestStatement) {
    return new Promise((resolve, reject) => {
        const result = [];

        request.on('row', (columns) => {
            const entry = {};
            columns.forEach((column) => {
                entry[column.metadata.colName] = column.value;
            });
            result.push(entry);
        });

        request.on('error', (error) => rejects(error));
        request.on('doneProc', () => resolve(result));

        connection.execSql(request);
    });
}
