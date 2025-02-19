import { UniqueEntityID } from "../../../../core/entity/unique-entity-id"
import { Answer } from "../../enterprise/entities/answer" 
import { AnswerRepository } from "../repositories/answers-repository"

interface AnswerQuestionUseCaseRequest {
    
    authorId: string
    questionId: string
    content: string
}


export class AnswerQuestionUseCase {

    constructor(
    private readonly repository: AnswerRepository
    ) {}

    async execute({authorId, content, questionId}: AnswerQuestionUseCaseRequest) {

        const answer = Answer.create({
            
            authorId: new UniqueEntityID(authorId),
            content,
            questionId: new UniqueEntityID(questionId)
        })

        this.repository.create(answer)

        return {
            answer
        }

    }

}