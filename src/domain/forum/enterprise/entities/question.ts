import { Slug } from "./value-objects/slug"
import dayjs from "dayjs"
import { UniqueEntityID } from "../../../../core/entity/unique-entity-id"
import { Entity } from "../../../../core/entity/entity"
import { Optional } from "../../../../core/types/optional"


export interface QuestionProps {

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

    get authorId() {
        return this.props.authorId
    }

    get content() {
        return this.props.content
    }

    get isNew(): boolean {

        return dayjs().diff(this.createdAt, 'days') <= 3 

    }


    get bestAnswerId() {
        return this.props.bestAnswerId
    }


    get slug() {
        return this.props.slug
    }

    set title(title: string) {
    
        this.props.title = title
        this.props.slug = Slug.createFromText(title)
        this.touch()
        
    }

    set content(content: string) {

        this.props.content = content
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