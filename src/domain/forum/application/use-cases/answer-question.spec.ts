import {beforeEach, describe, expect, it, } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswerRepository } from '../../../../../test/repositories/in-memory-answers-repository'

describe('', () =>{

    let inMemoryAnswerRepository: InMemoryAnswerRepository
    let sut: AnswerQuestionUseCase

    beforeEach(() => {

        inMemoryAnswerRepository = new InMemoryAnswerRepository()
        sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)

    })

    it('Create an answer', async () => {

        const result = await sut.execute({
            content: 'Nova resposta',
            authorId: '1',
            questionId: '1',
        })

        expect(result.isRight()).toBe(true)
        expect(inMemoryAnswerRepository.items[0]).toEqual(result.value.answer)    
        expect(inMemoryAnswerRepository.items).toHaveLength(1)    
    })

})

