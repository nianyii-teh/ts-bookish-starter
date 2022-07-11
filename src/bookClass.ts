class Book {
    id: number;
    title: string;
    isbn: string;
    copies_owned: number;

    constructor(id: number, title: string, isbn: string, copies_owned: number) {
        this.id = id;
        this.title = title;
        this.isbn = isbn;
        this.copies_owned = copies_owned;
    }

    convertToJson = () => {
        const data = {
            id: this.id,
            title: this.title,
            isbn: this.isbn,
            copies_owned: this.copies_owned
        }

        return data;
    }
}

export default Book;