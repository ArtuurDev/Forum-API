import { describe, beforeEach, it, expect } from "vitest";
import { EditAnswerUseCase } from "./edit-answer";
import { InMemoryAnswerRepository } from "../../../../../test/repositories/in-memory-answers-repository";
import { makeAnswer } from "../../../../../test/factories/make-answer";

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

        await sut.execute({
            authorId: answer.authorId.valueId,
            content: 'edit of content',
            id: answer.id.valueId
        })

        expect(answer.content).toEqual('edit of content')
    })

    it('should be able not edit answer to in incorrectly credentials', async ()=> {

        const answer = await makeAnswer()
        inMemoryAnswerRepository.create(answer)

        expect(async () => {

            await sut.execute({
                authorId: 'id incorreto',
                content: 'possivel edit de contúdo',
                id: 'id incorreto'
            })

        }).rejects.toBeInstanceOf(Error)

    })

})