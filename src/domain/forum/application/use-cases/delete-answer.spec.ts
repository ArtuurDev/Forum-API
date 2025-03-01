import { beforeEach, describe, expect, it } from "vitest"
import { DeleteAnswerUseCase } from "./delete-answer"
import { InMemoryAnswerRepository } from "../../../../../test/repositories/in-memory-answers-repository"
import { makeAnswer } from "../../../../../test/factories/make-answer"
import { AnswerNotFound } from "./errors/answer-not-found"


describe('Delete Answer', () => {
    
    let inMemoryAnswerRepository: InMemoryAnswerRepository
    let sut: DeleteAnswerUseCase

    beforeEach(()=>{
        inMemoryAnswerRepository = new InMemoryAnswerRepository()
        sut = new DeleteAnswerUseCase(inMemoryAnswerRepository)
    })


    it('Delete Answer by id', async () => {

        const newAnswer = await makeAnswer()
        
        inMemoryAnswerRepository.create(newAnswer)

       const result = await sut.execute({
            answerId: newAnswer.id.valueId,
            authorId: newAnswer.authorId.valueId
        })
        
        expect(result.isRight()).toBe(true)
        expect(inMemoryAnswerRepository.items).toHaveLength(0)
    
    })


    it('Should not be possible to delete a Answer with the wrong id ', async () => {

        const newAnswer = await makeAnswer()
        inMemoryAnswerRepository.create(newAnswer)

       const result = await sut.execute({
        answerId: '12233',
        authorId: 'snf'
    })
    
       expect(result.isLeft()).toBe(true) 
       expect(result.value).toBeInstanceOf(AnswerNotFound)

    })



})
