import { Either, left, right } from "../../../../core/either"
import { AnswerRepository } from "../repositories/answers-repository"
import { AnswerNotFound } from "./errors/answer-not-found"
import { NotAllowed } from "./errors/not-allowed"

interface DeleteAnswerRequest {
    answerId: string
    authorId: string
}

type DeleteAnswerUseCaseResponse = Either<string, {}>

export class DeleteAnswerUseCase {

    constructor(
        private readonly repository: AnswerRepository
    ) {}

    async execute({answerId, authorId}: DeleteAnswerRequest): Promise<DeleteAnswerUseCaseResponse> {
        
        const answer = await this.repository.findById(answerId)
        
        if(!answer) {
            return left(new AnswerNotFound()) 
        }

        if(answer.authorId.valueId !== authorId) {
            return left(new NotAllowed())
        }
        this.repository.delete(answer)
        
        return right({

        })
    }

}