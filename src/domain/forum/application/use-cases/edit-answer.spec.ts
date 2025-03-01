import { describe, beforeEach, it, expect } from "vitest";
import { EditAnswerUseCase } from "./edit-answer";
import { InMemoryAnswerRepository } from "../../../../../test/repositories/in-memory-answers-repository";
import { makeAnswer } from "../../../../../test/factories/make-answer";
import { AnswerNotFound } from "./errors/answer-not-found";

describe('Edit answer',() => {
    let inMemoryAnswerRepository: InMemoryAnswerRepository
    let sut: EditAnswerUseCase

    beforeEach(() => {

        inMemoryAnswerRepository = new InMemoryAnswerRepository()
        sut = new EditAnswerUseCase(inMemoryAnswerRepository)
    })
    
    it('Should be able edit one answer', async () => {

        const answer = await makeAnswer()
        inMemoryAnswerRepository.create(answer)

        const result = await sut.execute({
            authorId: answer.authorId.valueId,
            content: 'edit of content',
            answerId: answer.id.valueId
        })

        expect(result.isRight()).toBe(true)
        expect(inMemoryAnswerRepository.items[0]).toEqual(
            expect.objectContaining({
            content: 'edit of content'
        }))
    })

    it('should be able not edit answer to in incorrectly id', async ()=> {

        const answer = await makeAnswer()
        inMemoryAnswerRepository.create(answer)

        const result = await sut.execute({
            authorId: 'id incorreto',
            content: 'possivel edit de contúdo',
            answerId: 'id incorreto'
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(AnswerNotFound)

    })

})