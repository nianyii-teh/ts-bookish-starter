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
        this.router.get('/getAllBooksAlphabetically', this.getBooksAlphabetically.bind(this));
        this.router.get('/getCheckedOutBooks', this.getCheckedOutBooks.bind(this));

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

    getCheckedOutBooks(req: Request, res: Response) {
        // TODO: implement functionality
        const queryStatement: string = 'SELECT * FROM Books JOIN User_Books on Books.id = User_Books.book_id_val JOIN Users on User_Books.user_id_val = Users.id WHERE User_Books.returned_date is NULL;';
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

    getBooksAlphabetically(req: Request, res: Response) {
        // TODO: implement functionality
        const queryStatement: string = 'SELECT * FROM Books ORDER BY Title ASC';
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

    getBooksByTitle(req: Request, res: Response) {
        // TODO: implement functionality
        return res.status(500).json({
            error: 'server_error',
            error_description: 'Endpoint not implemented yet.',
        });
    }

    getBooksByAuthor(req: Request, res: Response) {
        // TODO: implement functionality
        return res.status(500).json({
            error: 'server_error',
            error_description: 'Endpoint not implemented yet.',
        });
    }

    getCopiesForBook(req: Request, res: Response) {
        // TODO: implement functionality
        return res.status(500).json({
            error: 'server_error',
            error_description: 'Endpoint not implemented yet.',
        });
    }

}

export default new BookController().router;
