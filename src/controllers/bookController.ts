import { Router, Request, Response } from 'express';
import { Connection, Request as RequestStatement } from 'tedious';
import { executeStatement } from './connectionConfig';


class BookController {
    router: Router;

    constructor() {
        this.router = Router();
        //this.router.get('/getBook/:id', this.getBook.bind(this));
        this.router.get('/getAllBooks', this.getAllBooks.bind(this));

        this.router.post('/', this.createBook.bind(this));
    }

    getBook(req: Request, res: Response) {
        // TODO: implement functionality
        const queryStatement: string = 'SELECT * FROM Books';
        const result: RequestStatement = executeStatement(queryStatement); 

        result.on('row', function (columns) {
            //console.log(columns);
            columns.forEach(column => {
                console.log(column.value);
            });
        });



        return res.status(500).json({
            error: 'server_error',
            error_description: 'Endpoint not implemented yet.',
        });
    }

    getAllBooks(req: Request, res: Response) {
        // TODO: implement functionality
        const queryStatement: string = 'SELECT * FROM Books';
        const result: RequestStatement = executeStatement(queryStatement); 

        result.on('row', function (columns) {
            columns.forEach(column => {
                if(column.metadata.colName === "title"){
                    console.log(column.value);
                }
            });
        });

        return res.status(200).json({
            status: "Data found"
        });

        //return res.status(500).json({
        //    error: 'server_error',
        //    error_description: 'Endpoint not implemented yet.',
        //});
    }


    createBook(req: Request, res: Response) {
        // TODO: implement functionality
        return res.status(500).json({
            error: 'server_error',
            error_description: 'Endpoint not implemented yet.',
        });
    }
}

export default new BookController().router;
