class Unauthorized extends Error {
    constructor(message) {
        super(message);
        this.name = 'Unauthorized';
        this.status = 401;
    }
}

export default Unauthorized;
