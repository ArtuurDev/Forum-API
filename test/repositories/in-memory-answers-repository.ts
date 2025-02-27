import { PaginationParams } from "../../src/core/repositories/paginations-params";
import { AnswerRepository } from "../../src/domain/forum/application/repositories/answers-repository";
import { Answer } from "../../src/domain/forum/enterprise/entities/answer";

export class InMemoryAnswerRepository implements AnswerRepository {


    items: Answer[] = []

    async create(answer: Answer) {

        this.items.push(answer)

    }

    async findById(id: string) {
        
        const question = this.items.find(item => item.id.valueId === id)

        return question

    }

    async delete(answer: Answer) {
        
        const index = this.items.findIndex(item => item.id.valueId === answer.id.valueId) 

        this.items.splice(index, 1)

    }


    async save(answer: Answer) {

        const index = this.items.findIndex(item => item.id.valueId === answer.id.valueId) 

        return this.items[index] = answer

    }    

    async findManyByQuestionId(questionsId: string, {page}: PaginationParams) {
        
        const answers = this.items.filter(item => item.questionId.valueId === questionsId)
        .slice((page - 1) * 20, page * 20 )

        return answers
    }

}