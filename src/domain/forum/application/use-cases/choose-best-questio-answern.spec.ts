import { beforeEach, describe, expect, it } from "vitest";
import { ChooseQuestionBestAnswerUseCase } from "./choose-best-question-answer";
import { InMemoryQuestionRepository } from "../../../../../test/repositories/in-memory-questions-repository";
import { makeQuestion } from "../../../../../test/factories/make-question";

describe("", () => {

    let inMemoryQuestionRepository: InMemoryQuestionRepository
    let sut: ChooseQuestionBestAnswerUseCase

    beforeEach(()=> {

        inMemoryQuestionRepository = new InMemoryQuestionRepository()
        sut = new ChooseQuestionBestAnswerUseCase(inMemoryQuestionRepository)

    })

    it('Shoud be able able to add best Answer question', async () => {

        const question = makeQuestion()
        inMemoryQuestionRepository.create(question)

        const bestquestion = await sut.execute({
            authorId: question.authorId.valueId,
            questionId: question.id.valueId
        })

        inMemoryQuestionRepository.save(bestquestion)

        expect(inMemoryQuestionRepository.items[0]).toEqual(bestquestion)

    })

})