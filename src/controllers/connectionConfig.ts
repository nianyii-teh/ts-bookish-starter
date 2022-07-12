import { Connection } from 'tedious';
import { Request as RequestStatement } from 'tedious';

class ConnectionManager {
    constructor() {
        this.setupConnection();
    }

    connection: Connection;

    config = {
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
        },
    };

    setupConnection() {
        this.connection = new Connection(this.config);

        // Setup event handler when the connection is established
        this.connection.on('connect', function (err) {
            if (err) {
                console.log('Error: ' + err);
            }

            console.log('Connected successfully');
        });

        this.connection.connect();
    }

    createStatement(sqlQuery: string) {
        const request = new RequestStatement(sqlQuery, function (
            err,
            rowCount,
        ) {
            if (err) {
                console.log(err);
            } else {
                console.log(rowCount + ' rows');
            }
        });
        return request;
    }

    executeStatement(request: RequestStatement) {
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

            this.connection.execSql(request);
        });
    }
}

export const connectionManager = new ConnectionManager();
