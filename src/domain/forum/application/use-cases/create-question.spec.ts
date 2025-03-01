import {beforeEach, describe, expect, it} from 'vitest'
import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionRepository } from '../../../../../test/repositories/in-memory-questions-repository'

describe('Create question', () => {
    let inMemoryQuestionRepository: InMemoryQuestionRepository
    let sut: CreateQuestionUseCase

    beforeEach(()=>{
        inMemoryQuestionRepository = new InMemoryQuestionRepository()
        sut = new CreateQuestionUseCase(inMemoryQuestionRepository)
    })

    it('Create a question', async () => {

        const result = await sut.execute({
            content: 'Conteúdo da pergunta',
            authorId: '1',
            title: 'nova resposta'
        })
    
        expect(result.isRight()).toBe(true)
        expect(result.value.question.id).toBeTruthy()
        expect(inMemoryQuestionRepository.items[0]).toEqual(result.value.question)
    })
})


