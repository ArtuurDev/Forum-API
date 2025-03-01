import { QuestionsRepository } from "../repositories/questions-repositories"
import { Question } from "../../enterprise/entities/question"
import { UniqueEntityID } from "../../../../core/entity/unique-entity-id"
import { Either, right } from "../../../../core/either"

interface CreateQuestionUseCaseRequest {
    authorId: string
    title: string
    content: string
}

type CreateQuestionUseCaseResponse = Either<null, Question>

export class CreateQuestionUseCase {

    constructor(
    private readonly repository: QuestionsRepository
    ) {}

    async execute({authorId, content, title}: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {

        const question = Question.create({
            authorId: new UniqueEntityID(authorId),
            title,
            content,

        })

        this.repository.create(question)

        return right({
            question
        })

    }

}