import { Either, left, right } from "../../../../core/either"
import { AnswerRepository } from "../repositories/answers-repository"

interface DeleteAnswerRequest {
    id: string
    authorId: string
}

type DeleteAnswerUseCaseResponse = Either<string, {}>

export class DeleteAnswerUseCase {

    constructor(
        private readonly repository: AnswerRepository
    ) {}

    async execute({id, authorId}: DeleteAnswerRequest): Promise<DeleteAnswerUseCaseResponse> {
        
        const answer = await this.repository.findById(id)
        
        if(!answer) {
            return left('ID inválido') 
        }

        if(answer.authorId.valueId !== authorId) {
            return left('Not alowed')
        }
        return right({})
    }

}