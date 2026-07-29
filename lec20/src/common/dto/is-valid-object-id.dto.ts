import { IsMongoId, IsNotEmpty } from "class-validator";

export class IsValidObjectId {
    @IsNotEmpty()
    @IsMongoId( )
    id!: string
}