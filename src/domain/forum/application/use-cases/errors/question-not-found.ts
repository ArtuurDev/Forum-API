import { UseCaseError } from "./interfaces/interface-use-case";

export class QuestionNotFound implements UseCaseError {
    message: string
    type: string

    constructor() {
       this.message = 'Question Not Found'
       this.type = 'use case' 
    }

}