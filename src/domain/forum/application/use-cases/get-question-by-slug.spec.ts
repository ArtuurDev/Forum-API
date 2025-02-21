import {beforeEach, describe, expect, it} from 'vitest'
import { InMemoryQuestionRepository } from '../../../../../test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { makeQuestion } from '../../../../../test/factories/make-question'

describe('Create question', () => {
    
    let inMemoryQuestionRepository: InMemoryQuestionRepository
    let sut: GetQuestionBySlugUseCase

    beforeEach(()=>{

        inMemoryQuestionRepository = new InMemoryQuestionRepository()
        sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository)

    })


    it('Find question by slug', async () => {

        const newQuestion = makeQuestion({
            title: 'primeira-question'
        })
        inMemoryQuestionRepository.create(newQuestion)

       const {question} = await sut.execute({
            slug: 'primeira-question'
        })

        expect(question).toEqual(newQuestion)
    
    })

})


