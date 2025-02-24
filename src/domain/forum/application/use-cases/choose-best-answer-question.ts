import { AnswerRepository } from "../repositories/answers-repository";
import { QuestionsRepository } from "../repositories/questions-repositories";


interface ChooseBestAnswerQuestionRequest {
    authorId: string
    answerId: string
}

export class ChooseBestAnswerQuestion {

    constructor(
        private readonly questionsRepository: QuestionsRepository,
        private readonly answerReposiotory: AnswerRepository
    ) {

    }

    async execute({authorId, answerId}: ChooseBestAnswerQuestionRequest) {

        const answer = await this.answerReposiotory.findById(answerId)

        if (!answer) {
            throw new Error('Answer not found') 
        }
        const question = await this.questionsRepository.findById(answer.questionId.valueId)

        if(!question) {
            throw new Error('question not found')
        }

        if(question.authorId.valueId !== authorId) {
            throw new Error('Not allowed')
        }

        question.bestAnswerId = answer.id

        await this.questionsRepository.save(question)

        return {
            question
        }

    }

}