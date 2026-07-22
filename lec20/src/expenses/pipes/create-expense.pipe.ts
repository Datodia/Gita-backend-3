import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";


export class CreateExpensePipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        const supportedCategories = ['shopping', 'food', 'sport', 'technic', 'travel']
        if(!value.category || !value.price){
            throw new BadRequestException('Category and price is required')
        }

        if(!supportedCategories.includes(value.category)){
            throw new BadRequestException('unsupported category provided')
        }

        if(isNaN(value.price) || value.price < 0){
            throw new BadRequestException('wrong price provided')
        }

        return {
            price: Number(value.price),
            category: value.category
        }
    }
}


// class A {
//     foo(){
//         console.log('test')
//     }
// }

// class B implements A{
//     foo(): void {
        
//     }
// }

