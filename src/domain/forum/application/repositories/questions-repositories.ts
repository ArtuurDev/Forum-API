import { PaginationParams } from "../../../../core/repositories/paginations-params";
import { Question } from "../../enterprise/entities/question";
import { EditQuestionRequest } from "../use-cases/edit-question";

export interface QuestionsRepository {

    findById(id: string): Promise<Question | undefined>
    delete(question:Question): Promise<void> 
    findBySlug(slug: string): Promise<Question | null> 
    create(question: Question): Promise<void> 
    save(data: Question): Promise<Question>
    findManyRecent(params: PaginationParams): Promise<Question[]>

}