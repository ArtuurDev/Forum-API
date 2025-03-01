import { left, right } from "../../../../core/either"
import { AnswerRepository } from "../repositories/answers-repository"
import { AnswerNotFound } from "./errors/answer-not-found"
import { NotAllowed } from "./errors/not-allowed"

 
export interface EditAnswerRequest {
 
    answerId:string
    authorId: string
    content: string
 
 }
 
 export class EditAnswerUseCase {
 
    constructor(
        private readonly repository: AnswerRepository
    ) {}
 
     async execute({answerId,authorId,content}: EditAnswerRequest) {
         
         const answer = await this.repository.findById(answerId)
         
         if(!answer) {
            return left(new AnswerNotFound())
         }

         if(answer.authorId.valueId !== authorId) {
            return left(new NotAllowed())
         }

        answer.content = content
         
        this.repository.save(answer)
        
        return right({
            
        })
     }
 
 }
 