import { Entity } from "../../../../core/entity/entity"


interface InstructorProps {
    name: string

}

export class Instructor extends Entity<InstructorProps> {

    get name() {

        return this.props.name
    }

}
