class Author {
    id: number;
    firstname: string;
    lastname: string;

    constructor(id: number, firstname: string, lastname: string) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
    }

    convertToJson = () => {
        const data = {
            id: this.id,
            firstname: this.firstname,
            lastname: this.lastname,
        };

        return data;
    };
}

export default Author;
