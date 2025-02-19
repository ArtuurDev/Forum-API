import { QuestionsRepository } from "../repositories/questions-repositories"
import { Question } from "../../enterprise/entities/question"
import { UniqueEntityID } from "../../../../core/entity/unique-entity-id"

interface CreateQuestionUseCaseRequest {
    
    authorId: string
    title: string
    content: string

}


export class CreateQuestionUseCase {

    constructor(
    private readonly repository: QuestionsRepository
    ) {}

    async execute({authorId, content, title}: CreateQuestionUseCaseRequest) {

        const question = Question.create({
            authorId: new UniqueEntityID(authorId),
            title,
            content,

        })

        this.repository.create(question)

        return {
            question
        }

    }

}