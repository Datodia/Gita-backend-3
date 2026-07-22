import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";


export class ExpenseQueryPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
        const supportedCategories = ['shopping', 'food', 'sport', 'technic', 'travel']
        if('category' in value && !supportedCategories.includes(value.category)){
            throw new BadRequestException('unknown category provied')
        }

        if('priceFrom' in value && (isNaN(value.priceFrom) || value.priceFrom < 0)){
            throw new BadRequestException('wrong priceFrom provided')
        }

        if('priceTo' in value && (isNaN(value.priceTo) || value.priceTo < 0)){
            throw new BadRequestException('wrong priceTo provided')
        }

        return {
            category: value.category,
            priceFrom: Number(value.priceFrom),
            priceTo: Number(value.priceTo)
        }
    }
}