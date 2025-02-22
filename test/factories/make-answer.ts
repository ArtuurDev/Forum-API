import { faker } from "@faker-js/faker/locale/en";
import { UniqueEntityID } from "../../src/core/entity/unique-entity-id";
import { Answer, AnswerProps } from "../../src/domain/forum/enterprise/entities/answer";

export async function makeAnswer(override: Partial<AnswerProps> = {}, id?: UniqueEntityID) {
    
    const answer = Answer.create({
        authorId: new UniqueEntityID(faker.string.uuid()),
        content: faker.lorem.text(),
        questionId: new UniqueEntityID(faker.string.uuid()),
        ...override
    }, id)


    return answer

}