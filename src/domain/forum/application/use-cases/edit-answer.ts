import { AnswerRepository } from "../repositories/answers-repository"

 
export interface EditAnswerRequest {
 
    id:string
    authorId: string
    content: string
 
 }
 
 export class EditAnswerUseCase {
 
 
     constructor(private readonly repository: AnswerRepository) {
     }
 
 
 
     async execute({id,authorId,content}: EditAnswerRequest) {
         
         const Answer = await this.repository.findById(id, authorId)
         
         if(!Answer) {
             throw new Error('Id de Answer não existe ou author da Answer não é o mesmo')
         }

        Answer.content = content
         
        this.repository.save(Answer)
        
        return {}
     }
 
 }
 