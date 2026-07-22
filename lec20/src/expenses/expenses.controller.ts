import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpensePipe } from './pipes/create-expense.pipe';
import { ExpenseQueryPipe } from './pipes/expense-query.pipe';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { PaginationDto } from './dto/pagination.dto';

// http://localhost:3000/expenses
@Controller('expenses')
export class ExpensesController {
    constructor(private readonly expensesService: ExpensesService){}


    @Get()
    getAll(
        // @Query('category') category,
        // @Query('priceFrom') priceFrom,
        // @Query(new ExpenseQueryPipe) query
        @Query() paginationDto: PaginationDto
    ){
        return this.expensesService.getAll(paginationDto)
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe) id){
        return this.expensesService.getById(id)
    }


    @Post()
    create(
        // @Body(new CreateExpensePipe()) body
        @Body() createExpenseDto: CreateExpenseDto,
    ){
        return this.expensesService.create(createExpenseDto)
    }
}
