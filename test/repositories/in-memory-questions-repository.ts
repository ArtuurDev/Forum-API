import { PaginationParams } from "../../src/core/repositories/paginations-params";
import { QuestionsRepository } from "../../src/domain/forum/application/repositories/questions-repositories";
import { Question } from "../../src/domain/forum/enterprise/entities/question";

export class InMemoryQuestionRepository implements QuestionsRepository {


    items: Question[] = []

    async create(question: Question) {

        this.items.push(question)

    }

    async findBySlug(slug: string) {
        
        const question = this.items.find(item => item.slug.value === slug) 

       if(!question) {
        return null
       }

       return question

    }

    async findById(id: string) {
        
        const question = this.items.find(item => item.id.valueId === id)

        return question

    }

    async delete(question: Question) {
        
        const index = this.items.findIndex(item => item.id === question.id)
        
        this.items.splice(index, 1)

    }

    async save(question: Question) {

        const index = this.items.findIndex(item => item.id.valueId === question.id.valueId)

        return this.items[index] = question
    }

    async findManyRecent({page}: PaginationParams) {
        
        const questions = this.items
        .sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime()).slice((page -1) * 20, page *20 )

        return questions

    }
}