import { PaginationParams } from "../../../../core/repositories/paginations-params";
import { Answer } from "../../enterprise/entities/answer";

export interface AnswerRepository {
    create(answer: Answer): Promise<void>
    findById(id: string): Promise<Answer | undefined>
    delete(answer: Answer): Promise<void>
    save(answer: Answer): Promise<Answer>
    findManyByQuestionId(questionsId: string, page: PaginationParams): Promise<Answer[]>
    
}