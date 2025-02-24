import {beforeEach, describe, expect, it} from 'vitest'
import { InMemoryQuestionRepository } from '../../../../../test/repositories/in-memory-questions-repository'
import { makeQuestion } from '../../../../../test/factories/make-question'
import { listRecentQuestionsUseCase } from './list-recent-questions'

describe('list recent question', () => {
    
    let inMemoryQuestionRepository: InMemoryQuestionRepository
    let sut: listRecentQuestionsUseCase

    beforeEach(()=>{

        inMemoryQuestionRepository = new InMemoryQuestionRepository()
        sut = new listRecentQuestionsUseCase(inMemoryQuestionRepository)

    })


    it('shoud be able to recent questions', async () => {

        await inMemoryQuestionRepository.create(makeQuestion({
            createdAt: new Date(2022, 0, 20)
        }))
        await inMemoryQuestionRepository.create(makeQuestion({
            createdAt: new Date(2022, 0, 18)
        }))
        await inMemoryQuestionRepository.create(makeQuestion({
            createdAt: new Date(2022, 0, 23)
        }))

        const {questions} = await sut.execute({
            page: 1
        })

        expect(questions).toEqual([

            expect.objectContaining({createdAt: new Date(2022, 0, 23)}),
            expect.objectContaining({createdAt: new Date(2022, 0, 20)}),
            expect.objectContaining({createdAt: new Date(2022, 0, 18)})

        ])
    
    })

    it('shoud be able to fetch paginetd recente questions', async () => {

        for (let i = 1; i <= 22; i++) {
            await inMemoryQuestionRepository.create(makeQuestion())
        }

        const {questions} = await sut.execute({
            page: 2
        })
        expect(questions).toHaveLength(2)
    })

})


