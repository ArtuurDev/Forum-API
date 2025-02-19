import { Slug } from "./value-objects/slug"
import dayjs from "dayjs"
import { UniqueEntityID } from "../../../../core/entity/unique-entity-id"
import { Entity } from "../../../../core/entity/entity"
import { Optional } from "../../../../core/types/optional"


interface QuestionProps {

    title: string
    content: string
    authorId: UniqueEntityID
    bestAnswerId?: UniqueEntityID
    slug: Slug
    createdAt: Date
    updatedAt?: Date

}

export class Question extends Entity<QuestionProps> {


    get createdAt() {
        return this.props.createdAt
    }

    get isNew(): boolean {

        return dayjs().diff(this.createdAt, 'days') <= 3 

    }


    get bestAnswerId() {
        return this.props.bestAnswerId
    }

    set title(title: string) {
    
        this.props.title = title
        this.props.slug = Slug.createFromText(title)
        this.touch()
        
    }


    set bestAnswerId(bestAnswerId: UniqueEntityID | undefined) {
        this.props.bestAnswerId = bestAnswerId
        this.touch()
    }

    private touch() {
        this.props.updatedAt = new Date()
    }

    static create(props: Optional<QuestionProps, 'createdAt' | 'slug' >, id?: UniqueEntityID) {

        const question = new Question({
            ...props,
            slug: props.slug ?? Slug.createFromText(props.title),
            createdAt: new Date()
        }, id ?? new UniqueEntityID())

        return question

    }

}