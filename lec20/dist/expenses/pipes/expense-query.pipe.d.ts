import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
export declare class ExpenseQueryPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): {
        category: any;
        priceFrom: number;
        priceTo: number;
    };
}
