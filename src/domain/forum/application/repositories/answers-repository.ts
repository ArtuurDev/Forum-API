import { Answer } from "../../enterprise/entities/answer";

export interface AnswerRepository {
    create(answer: Answer): Promise<void>
    findById(id: string, authorId: string): Promise<Answer | undefined>
    delete(answer: Answer): Promise<void>
    
}