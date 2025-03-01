import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryQuestionRepository } from "../../../../../test/repositories/in-memory-questions-repository";
import { ChooseBestAnswerQuestion } from "./choose-best-answer-question";
import { InMemoryAnswerRepository } from "../../../../../test/repositories/in-memory-answers-repository";
import { makeQuestion } from "../../../../../test/factories/make-question";
import { makeAnswer } from "../../../../../test/factories/make-answer";
import { AnswerNotFound } from "./errors/answer-not-found";

describe('tests to add the best question', () => {

    let inMemoryQuestionRepository: InMemoryQuestionRepository
    let inMemoryAnswerRepository: InMemoryAnswerRepository
    let sut: ChooseBestAnswerQuestion

    beforeEach(()=> {

        inMemoryQuestionRepository = new InMemoryQuestionRepository()
        inMemoryAnswerRepository = new InMemoryAnswerRepository()
        sut = new ChooseBestAnswerQuestion(inMemoryQuestionRepository, inMemoryAnswerRepository )
    })

    it('Shoud be able add best answer to question', async ()=> {

        const question = makeQuestion()
        inMemoryQuestionRepository.create(question)

        const answer = await makeAnswer({questionId: question.id})
        inMemoryAnswerRepository.create(answer)

        const result = await sut.execute({
            answerId: answer.id.valueId,
            authorId: question.authorId.valueId
        })

        expect(result.isRight()).toBe(true)
        expect(inMemoryQuestionRepository.items[0]).toEqual(result.value.question)

    })

    it('it should not be possible to add the best answer id incorretly', async () => {
        const question = makeQuestion()
        inMemoryQuestionRepository.create(question)

        const answer = await makeAnswer()
        inMemoryAnswerRepository.create(answer)

        const result = await sut.execute({
            answerId: 'incorreto id',
            authorId: question.authorId.valueId
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(AnswerNotFound)

    })
        
    })
