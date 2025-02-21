 import { QuestionsRepository } from "../repositories/questions-repositories";
 
export interface EditQuestionRequest {
 
    id:string
    authorId: string
    title: string
    content: string
 
 }
 
 export class EditQuestionUseCase {
 
 
     constructor(private readonly repository: QuestionsRepository) {
     }
 
 
 
     async execute({id,authorId,content,title}: EditQuestionRequest) {
         
         const question = await this.repository.findById(id, authorId)
         
         if(!question) {
             throw new Error('Id de question não existe ou author da question n é o mesmo')
         }

        question.title = title
        question.content = content
         
        this.repository.save(question)
        
        return {}
     }
 
 }
 