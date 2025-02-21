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


    get excerpt() {
        return this.content.substring(0,120).trimEnd().concat('...')
    }

    static create(props: Optional<AnswerProps, 'createdAt'>, id?: UniqueEntityID) {

        const answer = new Answer({...props,
            createdAt: new Date()
        }, id ?? new UniqueEntityID())

        return answer

    }

}