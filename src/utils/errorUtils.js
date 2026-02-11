export class ServerError extends Error {
    constructor(message, status) {
        super(message)
        this.name = 'ServerError'
        this.status = status
    }
}