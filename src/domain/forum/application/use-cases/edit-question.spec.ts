import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryQuestionRepository } from "../../../../../test/repositories/in-memory-questions-repository"
import { makeQuestion } from "../../../../../test/factories/make-question"
import { EditQuestionUseCase } from "./edit-question"
import { QuestionNotFound } from "./errors/question-not-found"

describe('Edit question', () => {
    
    let inMemoryQuestionRepository: InMemoryQuestionRepository
    let sut: EditQuestionUseCase

    beforeEach(()=>{

        inMemoryQuestionRepository = new InMemoryQuestionRepository()
        sut = new EditQuestionUseCase(inMemoryQuestionRepository)
    })

    it('Edit question by Id', async () => {

        const newQuestion = makeQuestion({
            title: 'primeira-question'
        })
        inMemoryQuestionRepository.create(newQuestion)

       const result = await sut.execute(
        {
            authorId: newQuestion.authorId.valueId,
            content: 'Novo conteudoo',
            questionId: newQuestion.id.valueId,
            title: 'novo titlee'
        })

        expect(result.isRight()).toBe(true)
        expect(inMemoryQuestionRepository.items[0]).toEqual(
            expect.objectContaining({
                content: 'Novo conteudoo',
        }))
    })

    it('Should not be possible to edit a question with the wrong id ', async () => {

        const newQuestion = makeQuestion({
            title: 'primeira-question'
        })

        inMemoryQuestionRepository.create(newQuestion)

        const result = await sut.execute({
            authorId: 'lm',
            questionId:'f',
            content: 'm',
            title: 'çlm'
        })
         
        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(QuestionNotFound)

    })

})
