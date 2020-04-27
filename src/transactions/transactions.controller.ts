import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { Transaction } from '../mongo/transaction.schema';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/createTransaction.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetTimeRangeReportDto } from './dto/getTimeRangeReport.dto';
import { TotalReportResultDto } from './dto/totalReportResult.dto';

export interface TotalSpentDto {
  category: string;
  spent: number;
  totalTransactions: string;
}

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

  @Get('category/categoryTotalSpent')
  @UseGuards(AuthGuard('jwt'))
  totalSpent(@Request() req): Promise<any> {
    return this.transactionsService.totalSpent();
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  deleteTransaction(@Param('id') id: string): Promise<Transaction | null> {
    return this.transactionsService.delete(id);
  }

  @Post('report/timeRange')
  @UseGuards(AuthGuard('jwt'))
  getTimeRangeReport(@Body() reportDto: GetTimeRangeReportDto): Promise<any> {
    return this.transactionsService.getTimeRangeReport(new Date(reportDto.startDate), new Date(reportDto.endDate), reportDto.accountId);
  }

  @Post('report/total')
  @UseGuards(AuthGuard('jwt'))
  getTotalReport(@Request() req): Promise<any[]> {
    return this.transactionsService.getTotalReport(req.user.userId);
  }

  @Post('mock/:id')
  @UseGuards(AuthGuard('jwt'))
  generateMockedTransactions(@Param('id') accountId: string, @Body() mockData: MockData) {

    console.log(`generate mocked data for ${accountId} dto: ${JSON.stringify(mockData)}`);

    const getRandomInt = (max) => {
      return Math.floor(Math.random() * Math.floor(max));
    };

    const getRandomIntInRange = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    };

    const randomCategory = () => {
      return mockData.categories[getRandomInt(mockData.categories.length)];
    };

    const randomDate = (start: Date, end: Date) => {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    };

    const startDate = new Date('February 2, 2020 03:24:00');
    const messages = [
      'Food transaction',
      'Debt transaction',
      'Money loan',
      'Income',
    ];

    const dtos = [];
    for (const i of [...Array(mockData.numberOfTransactions).keys()]) {
      const dto: CreateTransactionDto = {
        categoryId: randomCategory(),
        amount: getRandomIntInRange(mockData.minTransactionAmount, mockData.maxTransactionAmount),
        message: messages[getRandomIntInRange(0, messages.length)],
        accountId,
        createdAt: randomDate(startDate, new Date()),
      };
      dtos.push(dto);
      console.log(`generated dto`);
      console.log(dto);
    }
    return this.transactionsService.mockCreate(dtos);
  }
}

interface MockData {
  categories: [string];
  numberOfTransactions: number;
  minTransactionAmount: number;
  maxTransactionAmount: number;
}
