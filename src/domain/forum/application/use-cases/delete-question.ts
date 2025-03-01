import { Either, left, right } from "../../../../core/either"
import { Question } from "../../enterprise/entities/question"
import { QuestionsRepository } from "../repositories/questions-repositories"
import { NotAllowed } from "./errors/not-allowed"
import { QuestionNotFound } from "./errors/question-not-found"

interface DeleteQuestionUseCaseRequest {
    questionId: string
    authorId: string
}


type DeleteQuestionUseCaseResponse = Either<NotAllowed | QuestionNotFound, Question> 

export class DeleteQuestionUseCase {

    constructor(
        private readonly questionRepository: QuestionsRepository
    ) {}

    async execute({questionId,authorId}: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {

        const question = await this.questionRepository.findById(questionId)

        if(!question) {
            return left(new QuestionNotFound())
        }

        if(question.authorId.valueId !== authorId) {
            return left(new NotAllowed())
        }

        this.questionRepository.delete(question)

        return right({
            question
        })
    }

} 