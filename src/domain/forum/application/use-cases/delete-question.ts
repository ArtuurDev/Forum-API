import { QuestionsRepository } from "../repositories/questions-repositories";

interface DeleteQuestionRequest {

    id: string

}

export class DeleteQuestionUseCase {


    constructor(private readonly repository: QuestionsRepository) {
    }



    async execute({id}: DeleteQuestionRequest) {
        
        const question = await this.repository.findById(id)
        
        if(!question) {
            throw new Error('Esse Id não existe')
        }

        return this.repository.delete(question) 
    }

}