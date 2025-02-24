import { QuestionsRepository } from "../repositories/questions-repositories"
import { Question } from "../../enterprise/entities/question"
import { UniqueEntityID } from "../../../../core/entity/unique-entity-id"
import { Slug } from "../../enterprise/entities/value-objects/slug"

interface listRecentQuestionsUseCaseRequest {
    
    page: number

}


export class listRecentQuestionsUseCase {

    constructor(
    private readonly repository: QuestionsRepository
    ) {}

    async execute({page}: listRecentQuestionsUseCaseRequest) {

       

        const questions = await this.repository.findManyRecent({
            page
        })

        

        return {
            questions
        }

    }

}