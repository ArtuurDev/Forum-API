import {expect, test} from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'
import { AnswerRepository } from '../repositories/answers-repository'

const fakeAnswersRepository: AnswerRepository = {
    async create() {
        return 
    }
}


test('Create an answer', async () => {

    const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

    const {answer} = await answerQuestion.execute({
        content: 'Nova resposta',
        authorId: '1',
        questionId: '1',

    })

    expect(answer.content).toEqual('Nova resposta')

})