import { beforeEach, describe, expect, it } from "vitest"
import { DeleteAnswerUseCase } from "./delete-answer"
import { InMemoryAnswerRepository } from "../../../../../test/repositories/in-memory-answers-repository"
import { makeAnswer } from "../../../../../test/factories/make-answer"


describe('Delete Answer', () => {
    
    let inMemoryAnswerRepository: InMemoryAnswerRepository
    let sut: DeleteAnswerUseCase

    beforeEach(()=>{

        inMemoryAnswerRepository = new InMemoryAnswerRepository()
        sut = new DeleteAnswerUseCase(inMemoryAnswerRepository)

    })


    it('Find Answer by slug', async () => {

        const newAnswer = await makeAnswer()
        
        inMemoryAnswerRepository.create(newAnswer)

       await sut.execute({
            id: newAnswer.id.valueId,
            authorId: newAnswer.authorId.valueId
        })
        
        expect(inMemoryAnswerRepository.items).length(0)
    
    })


    it('Should not be possible to delete a Answer with the wrong id ', async () => {

        const newAnswer = await makeAnswer()
        inMemoryAnswerRepository.create(newAnswer)

       expect(async () => {
        await sut.execute({
            id: '12233',
            authorId: 'snf'
        })
       }).rejects.toBeInstanceOf(Error)
        
            
    })



})
