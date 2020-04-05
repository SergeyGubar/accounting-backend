import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Transaction } from '../mongo/transaction.schema';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/createTransaction.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
  ) {
  }

  @Post()
  addTransaction(@Body() createRecordDto: CreateTransactionDto): Promise<Transaction> {
    return this.transactionsService.create(createRecordDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  getForAccount(@Param('id') accountId: string): Promise<Transaction[]> {
    // TODO: Check if user owns this account
    return this.transactionsService.getForAccount(accountId);
  }
}
