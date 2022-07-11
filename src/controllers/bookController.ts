import { Router, Request, Response } from 'express';
import { Connection, Request as RequestStatement } from 'tedious';
import { executeStatement } from './connectionConfig';
import Book from '../bookClass';

class BookController {
    router: Router;

    constructor() {
        this.router = Router();
        this.router.get('/getBook/:id', this.getBook.bind(this));
        this.router.get('/getAllBooks', this.getAllBooks.bind(this));

        this.router.post('/', this.createBook.bind(this));
    }

    getBook(req: Request, res: Response) {
        // TODO: Implement get book by id
        return res.status(500).json({
            error: 'server_error',
            error_description: 'Endpoint not implemented yet.',
        });
    }

    getAllBooks(req: Request, res: Response) {
        const queryStatement: string = 'SELECT * FROM Books';
        let data = {};
        const result = executeStatement(queryStatement).then((rows: Array<Record<string, any>>) => {
            console.log(rows);
            
            rows.forEach(row => {
                data[row.id] = new Book(row.id, row.title, row.isbn, row.copies_owned);
            });

            return res.status(200).json({
                status: 200,
                data: data
            });
        }).catch((error) => {
            console.log(error);
        });
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
