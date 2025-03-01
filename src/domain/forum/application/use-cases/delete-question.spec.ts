import { beforeEach, describe, expect, it } from "vitest"
import { DeleteQuestionUseCase } from "./delete-question"
import { InMemoryQuestionRepository } from "../../../../../test/repositories/in-memory-questions-repository"
import { makeQuestion } from "../../../../../test/factories/make-question"
import { QuestionNotFound } from "./errors/question-not-found"
import { NotAllowed } from "./errors/not-allowed"

describe('Delete question', () => {
    
    let inMemoryQuestionRepository: InMemoryQuestionRepository
    let sut: DeleteQuestionUseCase

    beforeEach(()=>{

        inMemoryQuestionRepository = new InMemoryQuestionRepository()
        sut = new DeleteQuestionUseCase(inMemoryQuestionRepository)
    })

    it('delete by id', async () => {

        const newQuestion = makeQuestion({
            title: 'primeira-question'
        })

        inMemoryQuestionRepository.create(newQuestion)

       const result = await sut.execute({
            questionId: newQuestion.id.valueId,
            authorId: newQuestion.authorId.valueId
        })
        
        expect(result.isRight()).toBe(true)
        expect(inMemoryQuestionRepository.items).length(0)
    })

    it('Should not be possible to delete a question by id incorretly ', async () => {

        const newQuestion = makeQuestion({
            title: 'primeira-question'
        })
        inMemoryQuestionRepository.create(newQuestion)

        const result = await sut.execute({
            questionId: '12233',
            authorId: 'ed'
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(QuestionNotFound)
            
    })
    it('Should not be possible to delete a question by authorId incorretly ', async () => {

        const newQuestion = makeQuestion({
            title: 'primeira-question'
        })
        inMemoryQuestionRepository.create(newQuestion)

        const result = await sut.execute({
            questionId: newQuestion.id.valueId,
            authorId: 'ed'
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(NotAllowed)
            
    })


})
