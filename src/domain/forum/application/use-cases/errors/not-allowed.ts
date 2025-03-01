import { UseCaseError } from "./interfaces/interface-use-case";

export class NotAllowed implements UseCaseError {
    message: string
    type: string

    constructor() {
        this.message = 'Not Allowed'
        this.type = 'use case'
    }
}