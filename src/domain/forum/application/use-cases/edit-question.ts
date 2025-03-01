 import { Either, left, right } from "../../../../core/either";
import { QuestionsRepository } from "../repositories/questions-repositories";
import { NotAllowed } from "./errors/not-allowed";
import { QuestionNotFound } from "./errors/question-not-found";
 
export interface EditQuestionRequest {
    questionId:string
    authorId: string
    title: string
    content: string
 }

type EditQuestionUseCaseResponse = Either<QuestionNotFound | NotAllowed, {}>
 
export class EditQuestionUseCase {
 
    constructor(
        private readonly repository: QuestionsRepository
    ) {}
 
    async execute({questionId,authorId,content,title}: EditQuestionRequest): Promise<EditQuestionUseCaseResponse> {
         
        const question = await this.repository.findById(questionId)
         
        if(!question) {
            return left(new QuestionNotFound())
        }

        if(question.authorId.valueId !== authorId) {
            return left(new NotAllowed())
        }

        question.title = title
        question.content = content
         
        this.repository.save(question)
        
        return right({
            
        })
     }
 
 }
 