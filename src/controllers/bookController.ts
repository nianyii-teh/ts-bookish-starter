import { Router, Request, Response } from 'express';
import { Connection, Request as RequestStatement, TYPES } from 'tedious';
import { executeStatement, createStatement } from './connectionConfig';
import Book from '../bookClass';

class BookController {
    router: Router;

    constructor() {
        this.router = Router();
        this.router.get('/:id', this.getBook.bind(this));
        this.router.get('/', this.getAllBooks.bind(this));
        this.router.get(
            '/alphabetical',
            this.getBooksAlphabetically.bind(this),
        );
        this.router.get('/checkedOut', this.getCheckedOutBooks.bind(this));
        this.router.get('/title/:title', this.getBooksByTitle.bind(this));
        this.router.get('/author/:author', this.getBooksByAuthor.bind(this));

        this.router.post('/', this.createBook.bind(this));
    }

    getBook(req: Request, res: Response) {
        // TODO: Implement get book by id
        const id = req.params.id;
        if (id === undefined) {
            return res.status(400);
        }

        const queryStatement = createStatement(
            'SELECT * FROM Books WHERE ID = @id',
        );
        queryStatement.addParameter('id', TYPES.Int, id);
        const data = {};
        const result = executeStatement(queryStatement)
            .then((rows: Array<Record<string, any>>) => {
                console.log(rows);

                rows.forEach((row) => {
                    data[row.id] = new Book(
                        row.id,
                        row.title,
                        row.isbn,
                        row.copies_owned,
                    );
                });

                if (Object.keys(data).length === 0) {
                    return res.status(404).json({
                        error: 'Resource not found',
                    });
                }

                return res.status(200).json({
                    data: data,
                });
            })
            .catch((error) => {
                return res.status(500).json({
                    error: error,
                });
            });
    }

    getAllBooks(req: Request, res: Response) {
        const queryStatement = 'SELECT * FROM Books';
        const data = {};
        const result = executeStatement(queryStatement)
            .then((rows: Array<Record<string, any>>) => {
                console.log(rows);

                rows.forEach((row) => {
                    data[row.id] = new Book(
                        row.id,
                        row.title,
                        row.isbn,
                        row.copies_owned,
                    );
                });

                return res.status(200).json({
                    data: data,
                });
            })
            .catch((error) => {
                return res.status(500);
            });
    }

    getBooksAlphabetically(req: Request, res: Response) {
        // TODO: implement functionality
        const queryStatement = 'SELECT * FROM Books ORDER BY Title ASC';
        const data = {};
        const result = executeStatement(queryStatement)
            .then((rows: Array<Record<string, any>>) => {
                console.log(rows);

                rows.forEach((row) => {
                    data[row.id] = new Book(
                        row.id,
                        row.title,
                        row.isbn,
                        row.copies_owned,
                    );
                });

                return res.status(200).json({
                    data: data,
                });
            })
            .catch((error) => {
                return res.status(500);
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
        const queryStatement =
            'SELECT * FROM Books JOIN User_Books on Books.id = User_Books.book_id_val JOIN Users on User_Books.user_id_val = Users.id WHERE User_Books.returned_date is NULL;';
        const data = {};
        const result = executeStatement(queryStatement)
            .then((rows: Array<Record<string, any>>) => {
                console.log(rows);

                rows.forEach((row) => {
                    data[row.id] = new Book(
                        row.id,
                        row.title,
                        row.isbn,
                        row.copies_owned,
                    );
                });

                return res.status(200).json({
                    data: data,
                });
            })
            .catch((error) => {
                return res.status(500);
            });
    }

    getBooksByTitle(req: Request, res: Response) {
        console.log(req.params);
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
