import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpensePipe } from './pipes/create-expense.pipe';
import { ExpenseQueryPipe } from './pipes/expense-query.pipe';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { PaginationDto } from './dto/pagination.dto';
import { type Request } from 'express';
import { IsValidObjectId } from 'src/common/dto/is-valid-object-id.dto';
import { IsAuthGuard } from 'src/guards/isAuth.guard';
import { UserId } from 'src/users/decorators/user.decorator';

// http://localhost:3000/expenses
@Controller('expenses')
@UseGuards(IsAuthGuard)
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
    getById(@Param() {id}: IsValidObjectId){
        return this.expensesService.getById(id)
    }


    @Post()
    create(
        // @Body(new CreateExpensePipe()) body
        @Body() {amount, category}: CreateExpenseDto,
        @UserId() userId,
    ){
        return this.expensesService.create({amount, category, owner: userId})
    }
}
