import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { IExpense } from './interface/expense.interface';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class ExpensesService {

    private expenses = [
        {id: 1, category: 'food', price: 87, createdAt: '2026-02-04T07:11:00.000Z'},
        {id: 2, category: 'sport', price: 124, createdAt: '2026-03-07T14:22:00.000Z'},
        {id: 3, category: 'technic', price: 161, createdAt: '2026-04-10T21:33:00.000Z'},
        {id: 4, category: 'travel', price: 198, createdAt: '2026-05-13T04:44:00.000Z'},
        {id: 5, category: 'shopping', price: 235, createdAt: '2026-06-16T11:55:00.000Z'},
        {id: 6, category: 'food', price: 272, createdAt: '2026-07-19T18:06:00.000Z'},
        {id: 7, category: 'sport', price: 309, createdAt: '2026-08-22T01:17:00.000Z'},
        {id: 8, category: 'technic', price: 346, createdAt: '2026-09-25T08:28:00.000Z'},
        {id: 9, category: 'travel', price: 383, createdAt: '2026-10-28T15:39:00.000Z'},
        {id: 10, category: 'shopping', price: 420, createdAt: '2026-11-03T22:50:00.000Z'},
        {id: 11, category: 'food', price: 457, createdAt: '2026-12-06T05:01:00.000Z'},
        {id: 12, category: 'sport', price: 494, createdAt: '2026-01-09T12:12:00.000Z'},
        {id: 13, category: 'technic', price: 531, createdAt: '2026-02-12T19:23:00.000Z'},
        {id: 14, category: 'travel', price: 568, createdAt: '2026-03-15T02:34:00.000Z'},
        {id: 15, category: 'shopping', price: 605, createdAt: '2026-04-18T09:45:00.000Z'},
        {id: 16, category: 'food', price: 642, createdAt: '2026-05-21T16:56:00.000Z'},
        {id: 17, category: 'sport', price: 679, createdAt: '2026-06-24T23:07:00.000Z'},
        {id: 18, category: 'technic', price: 716, createdAt: '2026-07-27T06:18:00.000Z'},
        {id: 19, category: 'travel', price: 753, createdAt: '2026-08-02T13:29:00.000Z'},
        {id: 20, category: 'shopping', price: 790, createdAt: '2026-09-05T20:40:00.000Z'},
        {id: 21, category: 'food', price: 827, createdAt: '2026-10-08T03:51:00.000Z'},
        {id: 22, category: 'sport', price: 864, createdAt: '2026-11-11T10:02:00.000Z'},
        {id: 23, category: 'technic', price: 901, createdAt: '2026-12-14T17:13:00.000Z'},
        {id: 24, category: 'travel', price: 938, createdAt: '2026-01-17T00:24:00.000Z'},
        {id: 25, category: 'shopping', price: 975, createdAt: '2026-02-20T07:35:00.000Z'},
        {id: 26, category: 'food', price: 62, createdAt: '2026-03-23T14:46:00.000Z'},
        {id: 27, category: 'sport', price: 99, createdAt: '2026-04-26T21:57:00.000Z'},
        {id: 28, category: 'technic', price: 136, createdAt: '2026-05-01T04:08:00.000Z'},
        {id: 29, category: 'travel', price: 173, createdAt: '2026-06-04T11:19:00.000Z'},
        {id: 30, category: 'shopping', price: 210, createdAt: '2026-07-07T18:30:00.000Z'},
        {id: 31, category: 'food', price: 247, createdAt: '2026-08-10T01:41:00.000Z'},
        {id: 32, category: 'sport', price: 284, createdAt: '2026-09-13T08:52:00.000Z'},
        {id: 33, category: 'technic', price: 321, createdAt: '2026-10-16T15:03:00.000Z'},
        {id: 34, category: 'travel', price: 358, createdAt: '2026-11-19T22:14:00.000Z'},
        {id: 35, category: 'shopping', price: 395, createdAt: '2026-12-22T05:25:00.000Z'},
        {id: 36, category: 'food', price: 432, createdAt: '2026-01-25T12:36:00.000Z'},
        {id: 37, category: 'sport', price: 469, createdAt: '2026-02-28T19:47:00.000Z'},
        {id: 38, category: 'technic', price: 506, createdAt: '2026-03-03T02:58:00.000Z'},
        {id: 39, category: 'travel', price: 543, createdAt: '2026-04-06T09:09:00.000Z'},
        {id: 40, category: 'shopping', price: 580, createdAt: '2026-05-09T16:20:00.000Z'},
        {id: 41, category: 'food', price: 617, createdAt: '2026-06-12T23:31:00.000Z'},
        {id: 42, category: 'sport', price: 654, createdAt: '2026-07-15T06:42:00.000Z'},
        {id: 43, category: 'technic', price: 691, createdAt: '2026-08-18T13:53:00.000Z'},
        {id: 44, category: 'travel', price: 728, createdAt: '2026-09-21T20:04:00.000Z'},
        {id: 45, category: 'shopping', price: 765, createdAt: '2026-10-24T03:15:00.000Z'},
        {id: 46, category: 'food', price: 802, createdAt: '2026-11-27T10:26:00.000Z'},
        {id: 47, category: 'sport', price: 839, createdAt: '2026-12-02T17:37:00.000Z'},
        {id: 48, category: 'technic', price: 876, createdAt: '2026-01-05T00:48:00.000Z'},
        {id: 49, category: 'travel', price: 913, createdAt: '2026-02-08T07:59:00.000Z'},
        {id: 50, category: 'shopping', price: 950, createdAt: '2026-03-11T14:10:00.000Z'},
        {id: 51, category: 'food', price: 987, createdAt: '2026-04-14T21:21:00.000Z'},
        {id: 52, category: 'sport', price: 74, createdAt: '2026-05-17T04:32:00.000Z'},
        {id: 53, category: 'technic', price: 111, createdAt: '2026-06-20T11:43:00.000Z'},
        {id: 54, category: 'travel', price: 148, createdAt: '2026-07-23T18:54:00.000Z'},
        {id: 55, category: 'shopping', price: 185, createdAt: '2026-08-26T01:05:00.000Z'},
        {id: 56, category: 'food', price: 222, createdAt: '2026-09-01T08:16:00.000Z'},
        {id: 57, category: 'sport', price: 259, createdAt: '2026-10-04T15:27:00.000Z'},
        {id: 58, category: 'technic', price: 296, createdAt: '2026-11-07T22:38:00.000Z'},
        {id: 59, category: 'travel', price: 333, createdAt: '2026-12-10T05:49:00.000Z'},
        {id: 60, category: 'shopping', price: 370, createdAt: '2026-01-13T12:00:00.000Z'},
        {id: 61, category: 'food', price: 407, createdAt: '2026-02-16T19:11:00.000Z'},
        {id: 62, category: 'sport', price: 444, createdAt: '2026-03-19T02:22:00.000Z'},
        {id: 63, category: 'technic', price: 481, createdAt: '2026-04-22T09:33:00.000Z'},
        {id: 64, category: 'travel', price: 518, createdAt: '2026-05-25T16:44:00.000Z'},
        {id: 65, category: 'shopping', price: 555, createdAt: '2026-06-28T23:55:00.000Z'},
        {id: 66, category: 'food', price: 592, createdAt: '2026-07-03T06:06:00.000Z'},
        {id: 67, category: 'sport', price: 629, createdAt: '2026-08-06T13:17:00.000Z'},
        {id: 68, category: 'technic', price: 666, createdAt: '2026-09-09T20:28:00.000Z'},
        {id: 69, category: 'travel', price: 703, createdAt: '2026-10-12T03:39:00.000Z'},
        {id: 70, category: 'shopping', price: 740, createdAt: '2026-11-15T10:50:00.000Z'},
        {id: 71, category: 'food', price: 777, createdAt: '2026-12-18T17:01:00.000Z'},
        {id: 72, category: 'sport', price: 814, createdAt: '2026-01-21T00:12:00.000Z'},
        {id: 73, category: 'technic', price: 851, createdAt: '2026-02-24T07:23:00.000Z'},
        {id: 74, category: 'travel', price: 888, createdAt: '2026-03-27T14:34:00.000Z'},
        {id: 75, category: 'shopping', price: 925, createdAt: '2026-04-02T21:45:00.000Z'},
        {id: 76, category: 'food', price: 962, createdAt: '2026-05-05T04:56:00.000Z'},
        {id: 77, category: 'sport', price: 999, createdAt: '2026-06-08T11:07:00.000Z'},
        {id: 78, category: 'technic', price: 86, createdAt: '2026-07-11T18:18:00.000Z'},
        {id: 79, category: 'travel', price: 123, createdAt: '2026-08-14T01:29:00.000Z'},
        {id: 80, category: 'shopping', price: 160, createdAt: '2026-09-17T08:40:00.000Z'},
        {id: 81, category: 'food', price: 197, createdAt: '2026-10-20T15:51:00.000Z'},
        {id: 82, category: 'sport', price: 234, createdAt: '2026-11-23T22:02:00.000Z'},
        {id: 83, category: 'technic', price: 271, createdAt: '2026-12-26T05:13:00.000Z'},
        {id: 84, category: 'travel', price: 308, createdAt: '2026-01-01T12:24:00.000Z'},
        {id: 85, category: 'shopping', price: 345, createdAt: '2026-02-04T19:35:00.000Z'},
        {id: 86, category: 'food', price: 382, createdAt: '2026-03-07T02:46:00.000Z'},
        {id: 87, category: 'sport', price: 419, createdAt: '2026-04-10T09:57:00.000Z'},
        {id: 88, category: 'technic', price: 456, createdAt: '2026-05-13T16:08:00.000Z'},
        {id: 89, category: 'travel', price: 493, createdAt: '2026-06-16T23:19:00.000Z'},
        {id: 90, category: 'shopping', price: 530, createdAt: '2026-07-19T06:30:00.000Z'},
        {id: 91, category: 'food', price: 567, createdAt: '2026-08-22T13:41:00.000Z'},
        {id: 92, category: 'sport', price: 604, createdAt: '2026-09-25T20:52:00.000Z'},
        {id: 93, category: 'technic', price: 641, createdAt: '2026-10-28T03:03:00.000Z'},
        {id: 94, category: 'travel', price: 678, createdAt: '2026-11-03T10:14:00.000Z'},
        {id: 95, category: 'shopping', price: 715, createdAt: '2026-12-06T17:25:00.000Z'},
        {id: 96, category: 'food', price: 752, createdAt: '2026-01-09T00:36:00.000Z'},
        {id: 97, category: 'sport', price: 789, createdAt: '2026-02-12T07:47:00.000Z'},
        {id: 98, category: 'technic', price: 826, createdAt: '2026-03-15T14:58:00.000Z'},
        {id: 99, category: 'travel', price: 863, createdAt: '2026-04-18T21:09:00.000Z'},
        {id: 100, category: 'shopping', price: 900, createdAt: '2026-05-21T04:20:00.000Z'},
    ]

    getAll({page, take}: PaginationDto){
        const start = (page - 1) * take
        const stop = page * take

        const data = this.expenses.slice(start, stop)
        
        return {
            expenses: data,
            total: this.expenses.length,
            page,
            limit: take,
        }
    }


    getById(id: number){
        const expense = this.expenses.find(e => e?.id === id)
        if(!expense){
            // throw new HttpException('not found', HttpStatus.NOT_FOUND)
            throw new NotFoundException('Expense not found')
        }

        return expense
    }

    create({category, price}: CreateExpenseDto){
        const lastId = this.expenses[this.expenses.length - 1]?.id || 0

        const newExpense = {
            id: lastId+1,
            category,
            price,
            createdAt: new Date().toISOString()
        }

        this.expenses.push(newExpense)

        return newExpense
    }
}
