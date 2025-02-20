import {beforeEach, describe, expect, it, } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswerRepository } from '../../../../../test/repositories/in-memory-answers-repository'

describe('', ()=>{

    let inMemoryAnswerRepository: InMemoryAnswerRepository
    let sut: AnswerQuestionUseCase

    beforeEach(()=>{

        inMemoryAnswerRepository = new InMemoryAnswerRepository()
        sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)

    })

    it('Create an answer', async () => {

    
        const {answer} = await sut.execute({
            content: 'Nova resposta',
            authorId: '1',
            questionId: '1',
    
        })
    
        expect(answer.content).toEqual('Nova resposta')
        expect(inMemoryAnswerRepository.items[0]).toEqual(answer)
    
    })

})

