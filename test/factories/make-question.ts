import { UniqueEntityID } from "../../src/core/entity/unique-entity-id";
import { Question, QuestionProps } from "../../src/domain/forum/enterprise/entities/question";
import {faker} from '@faker-js/faker'

export function makeQuestion(override: Partial<QuestionProps> = {}, id?: UniqueEntityID ) {

    const question = Question.create({
        authorId: new UniqueEntityID(faker.string.uuid()),
        content: faker.lorem.text(),
        title: faker.lorem.sentence(),
        ...override
    }, id)

    return question

}