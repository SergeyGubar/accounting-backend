import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTransactionDto } from './dto/createTransaction.dto';
import { Transaction, TransactionT } from '../mongo/transaction.schema';
import { AccountsService } from '../accounts/accounts.service';

@Injectable()
export class TransactionsService {
  constructor(@InjectModel('Transaction') private readonly transactionModel: Model<Transaction>,
              private readonly accountsService: AccountsService) {
  }

  async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    await this.accountsService.accountTransaction(createTransactionDto.accountId, createTransactionDto.amount);
    const record: TransactionT = {
      accountId: createTransactionDto.accountId,
      amount: createTransactionDto.amount,
      categoryId: createTransactionDto.categoryId,
    };
    return this.transactionModel.create(record);
  }

  async getForAccount(accountId: string): Promise<Transaction[]> {
    return new Promise((resolve, reject) => {
      this.transactionModel.find({ accountId }, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
}
