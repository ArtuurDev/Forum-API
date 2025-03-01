import { Either, left, right } from "../../../../core/either";
import { Question } from "../../enterprise/entities/question";
import { AnswerRepository } from "../repositories/answers-repository";
import { QuestionsRepository } from "../repositories/questions-repositories";
import { AnswerNotFound } from "./errors/answer-not-found";
import { NotAllowed } from "./errors/not-allowed";
import { QuestionNotFound } from "./errors/question-not-found";

interface ChooseBestAnswerQuestionRequest {
    authorId: string
    answerId: string
}

type ChooseBestAnswerQuestionResponse = Either<AnswerNotFound | QuestionNotFound | NotAllowed, Question > 

export class ChooseBestAnswerQuestion {

    constructor(
        private readonly questionsRepository: QuestionsRepository,
        private readonly answerReposiotory: AnswerRepository
    ) {}

    async execute({authorId, answerId}: ChooseBestAnswerQuestionRequest): Promise<ChooseBestAnswerQuestionResponse> {

        const answer = await this.answerReposiotory.findById(answerId)

        if (!answer) {
            return left(new AnswerNotFound()) 
        }
        const question = await this.questionsRepository.findById(answer.questionId.valueId)

        if(!question) {
            return left(new QuestionNotFound())
        }

        if(question.authorId.valueId !== authorId) {
            return left(new NotAllowed())
        }

        question.bestAnswerId = answer.id

        await this.questionsRepository.save(question)

        return right({
            question
        })

    }

}