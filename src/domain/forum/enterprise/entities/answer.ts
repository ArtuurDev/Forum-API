import { Entity } from "../../../../core/entity/entity"
import { UniqueEntityID } from "../../../../core/entity/unique-entity-id"
import { Optional } from "../../../../core/types/optional"

export interface AnswerProps {

    content: string
    authorId: UniqueEntityID
    questionId: UniqueEntityID
    createdAt: Date
    updatedAt?: Date
}

export class Answer extends Entity<AnswerProps> {

    get content() {
        return this.props.content
    }

    set content(content) {
        this.props.content = content
        this.touch()
    }

    get excerpt() {
        return this.content.substring(0,120).trimEnd().concat('...')
    }

    get authorId(){
        return this.props.authorId
    }

    private touch() {
        this.props.updatedAt = new Date()
    }

    static create(props: Optional<AnswerProps, 'createdAt'>, id?: UniqueEntityID) {

        const answer = new Answer({...props,
            createdAt: new Date()
        }, id ?? new UniqueEntityID())

        return answer

    }

}