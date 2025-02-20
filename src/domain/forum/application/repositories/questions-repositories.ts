import { Question } from "../../enterprise/entities/question";

export interface QuestionsRepository {

    findById(id: string): Promise<Question | undefined>
    delete(question:Question): Promise<void> 
    findBySlug(slug: string): Promise<Question | null> 
    create(question: Question): Promise<void> 

}