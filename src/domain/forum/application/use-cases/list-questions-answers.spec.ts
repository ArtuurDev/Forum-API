import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryAnswerRepository } from "../../../../../test/repositories/in-memory-answers-repository";
import { ListQuestionAnswerUseCase } from "./list-questions-answer";
import { makeAnswer } from "../../../../../test/factories/make-answer";
import { UniqueEntityID } from "../../../../core/entity/unique-entity-id";

describe('test referring to the list of answered questions', ()=> {

    let inMemoryAnswerRepository: InMemoryAnswerRepository
    let sut: ListQuestionAnswerUseCase

    beforeEach(() => {
        
        inMemoryAnswerRepository = new InMemoryAnswerRepository()
        sut = new ListQuestionAnswerUseCase(inMemoryAnswerRepository)
    })


    it('Shoul be able list question answered', async () => {

        inMemoryAnswerRepository.create(
            await makeAnswer({
                questionId: new UniqueEntityID('1')
            })
        )

        inMemoryAnswerRepository.create(
            await makeAnswer({
                questionId: new UniqueEntityID('1')
            })
        )

        inMemoryAnswerRepository.create(
            await makeAnswer({
                questionId: new UniqueEntityID('1')
            })
        )

        const {answers} = await sut.execute({
            questionsId: '1',
            page: 1
        })

        expect(answers).toHaveLength(3)

    })

    it('test of pagination', async ()=> {

        for(let i = 1; i <= 22; i++) {
            inMemoryAnswerRepository.create(
                await makeAnswer({
                    questionId: new UniqueEntityID('1')
                })
            )
        }

        const {answers} = await sut.execute({
            questionsId: '1',
            page: 2
        })

        expect(answers).toHaveLength(2)

    })

})