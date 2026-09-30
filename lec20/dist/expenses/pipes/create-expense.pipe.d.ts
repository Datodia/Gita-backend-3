import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
export declare class CreateExpensePipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): {
        price: number;
        category: any;
    };
}
