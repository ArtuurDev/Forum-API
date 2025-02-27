import { AnswerRepository } from "../repositories/answers-repository"

interface ListQuestionAnswerRequest {

    questionsId: string
    page: number

}

export class ListQuestionAnswerUseCase {

    constructor(private readonly answerRepository: AnswerRepository) { 

    }

    async execute({questionsId,page}: ListQuestionAnswerRequest) {

        const answers = await this.answerRepository.findManyByQuestionId(questionsId, {page})

        return {
            answers
        }

    }

}