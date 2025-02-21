import { beforeEach, describe, expect, it } from "vitest"
import { DeleteQuestionUseCase } from "./delete-question"
import { InMemoryQuestionRepository } from "../../../../../test/repositories/in-memory-questions-repository"
import { makeQuestion } from "../../../../../test/factories/make-question"

describe('Delete question', () => {
    
    let inMemoryQuestionRepository: InMemoryQuestionRepository
    let sut: DeleteQuestionUseCase

    beforeEach(()=>{

        inMemoryQuestionRepository = new InMemoryQuestionRepository()
        sut = new DeleteQuestionUseCase(inMemoryQuestionRepository)

    })


    it('Find question by slug', async () => {

        const newQuestion = makeQuestion({
            title: 'primeira-question'
        })
        inMemoryQuestionRepository.create(newQuestion)


       await sut.execute({
            id: newQuestion.id.valueId,
            authorId: newQuestion.authorId.valueId
        })
        
        expect(inMemoryQuestionRepository.items).length(0)
    
    })


    it('Should not be possible to delete a question with the wrong id ', async () => {

        const newQuestion = makeQuestion({
            title: 'primeira-question'
        })
        inMemoryQuestionRepository.create(newQuestion)


       expect(async () => {
        await sut.execute({
            id: '12233',
            authorId: 'ed'
        })
       }).rejects.toBeInstanceOf(Error)
        
            
    })



})
