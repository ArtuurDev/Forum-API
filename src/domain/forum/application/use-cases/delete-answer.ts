import { AnswerRepository } from "../repositories/answers-repository"

interface DeleteAnswerRequest {

    id: string
    authorId: string

}

export class DeleteAnswerUseCase {


    constructor(private readonly repository: AnswerRepository) {
    }



    async execute({id, authorId}: DeleteAnswerRequest) {
        
        const Answer = await this.repository.findById(id, authorId)
        
        if(!Answer) {
            throw new Error('Não autorizado')
        }

        return this.repository.delete(Answer) 
    }

}