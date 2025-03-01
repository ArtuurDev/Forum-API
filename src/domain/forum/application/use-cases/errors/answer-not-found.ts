import { UseCaseError } from "./interfaces/interface-use-case";

export class AnswerNotFound implements UseCaseError {
    public message: string
    public type: string

    constructor() {
        this.message = 'Answer Not Found'
        this.type = 'use case' 
    }
}