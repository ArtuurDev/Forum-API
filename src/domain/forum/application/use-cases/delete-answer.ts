import { AnswerRepository } from "../repositories/answers-repository"

interface DeleteAnswerRequest {

    id: string

}

export class DeleteAnswerUseCase {


    constructor(private readonly repository: AnswerRepository) {
    }



    async execute({id}: DeleteAnswerRequest) {
        
        const Answer = await this.repository.findById(id)
        
        if(!Answer) {
            throw new Error('Esse Id não existe')
        }

        return this.repository.delete(Answer) 
    }

}