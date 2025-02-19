import { QuestionsRepository } from "../../src/domain/forum/application/repositories/questions-repositories";
import { Question } from "../../src/domain/forum/enterprise/entities/question";

export class InMemoryQuestionRepository implements QuestionsRepository {


    items: Question[] = []

    async create(question: Question) {

        this.items.push(question)

    }


}