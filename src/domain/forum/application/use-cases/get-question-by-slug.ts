import { QuestionsRepository } from "../repositories/questions-repositories"
import { Question } from "../../enterprise/entities/question"
import { UniqueEntityID } from "../../../../core/entity/unique-entity-id"
import { Slug } from "../../enterprise/entities/value-objects/slug"

interface GetQuestionBySlugUseCaseRequest {
    
    slug: string

}


export class GetQuestionBySlugUseCase {

    constructor(
    private readonly repository: QuestionsRepository
    ) {}

    async execute({slug}: GetQuestionBySlugUseCaseRequest) {

       

        const question = await this.repository.findBySlug(slug)

        if(!question) {
            throw new Error('question not found')
        }

        return {
            question
        }

    }

}