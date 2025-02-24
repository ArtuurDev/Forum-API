import { UniqueEntityID } from "../../../../core/entity/unique-entity-id"
import { QuestionsRepository } from "../repositories/questions-repositories"

interface ChooseQuestionBestAnswerUseCaseRequest {
    
    authorId: string
    questionId: string
}


export class ChooseQuestionBestAnswerUseCase {

    constructor(
    private readonly repository: QuestionsRepository
    ) {}

    async execute({authorId, questionId}: ChooseQuestionBestAnswerUseCaseRequest) {

        const dAlreadyExists = await this.repository.findById(questionId, authorId)

        if(!dAlreadyExists) {
            throw new Error('error credencials')
        }

        dAlreadyExists.bestAnswerId = new UniqueEntityID(questionId)

        return this.repository.save(dAlreadyExists)

    }

}