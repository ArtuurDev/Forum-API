import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryQuestionRepository } from "../../../../../test/repositories/in-memory-questions-repository"
import { makeQuestion } from "../../../../../test/factories/make-question"
import { EditQuestionUseCase } from "./edit-question"
import { Console } from "console"

describe('Edit question', () => {
    
    let inMemoryQuestionRepository: InMemoryQuestionRepository
    let sut: EditQuestionUseCase

    beforeEach(()=>{

        inMemoryQuestionRepository = new InMemoryQuestionRepository()
        sut = new EditQuestionUseCase(inMemoryQuestionRepository)

    })


    it('Find question by slug', async () => {

        const newQuestion = makeQuestion({
            title: 'primeira-question'
        })
        inMemoryQuestionRepository.create(newQuestion)

        console.log(inMemoryQuestionRepository.items)

       await sut.execute(
        {
            authorId: newQuestion.authorId.valueId,
            content: 'Novo conteudoo',
            id: newQuestion.id.valueId,
            title: 'novo titlee'
        }
       )
        console.log('AA',inMemoryQuestionRepository.items)
        expect(inMemoryQuestionRepository.items[0]).toEqual(newQuestion)
    
    })


    it('Should not be possible to edit a question with the wrong id ', async () => {

        const newQuestion = makeQuestion({
            title: 'primeira-question'
        })
        inMemoryQuestionRepository.create(newQuestion)

        console.log(inMemoryQuestionRepository.items)

       expect(async () => {
        await sut.execute({
            authorId: 'lm',
            id: ', f',
            content: 'm',
            title: 'çlm'
        })
       }).rejects.toBeInstanceOf(Error)
        
            
    })



})
