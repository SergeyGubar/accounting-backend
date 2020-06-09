import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateTransactionDto } from './dto/createTransaction.dto';
import { Transaction, TransactionT } from '../mongo/transaction.schema';
import { AccountsService } from '../accounts/accounts.service';
import { CategoriesService } from '../categories/categories.service';
import { TotalSpentDto } from './transactions.controller';

@Injectable()
export class TransactionsService {
  constructor(@InjectModel('Transaction') private readonly transactionModel: Model<Transaction>,
              private readonly accountsService: AccountsService,
              private readonly categoriesService: CategoriesService) {
  }

  async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    await this.accountsService.accountTransaction(createTransactionDto.accountId, createTransactionDto.amount);
    const category = await this.categoriesService.categoryById(createTransactionDto.categoryId);
    const record: TransactionT = {
      accountId: createTransactionDto.accountId,
      amount: -createTransactionDto.amount,
      message: createTransactionDto.message,
      category,
    };
    return this.transactionModel.create(record);
  }

  async getTimeRangeReport(startDate: Date, endDate: Date, accountId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.transactionModel.aggregate([
        {
          $match: {
            accountId: {
              $eq: Types.ObjectId(accountId),
            },
            createdAt: {
              $gt: startDate,
              $lte: endDate,
            },
          },
        },
        {
          $group: {
            _id: {
              month: { $month: '$createdAt' },
              day: { $dayOfMonth: '$createdAt' },
              year: { $year: '$createdAt' },
              createdAt: {
                $dateToString: {
                  date: '$createdAt',
                  format: '%Y-%m-%d',
                },
              },
            },
            totalSpent: { $sum: '$amount' },
            count: { $sum: 1 },
          },
        },
        {
          $sort: {
            '_id.createdAt': -1,
          },
        },
      ], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  async getTotalReport(userId: string): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      const accounts = await this.accountsService.getAll(userId);
      const reports = [];
      for (const account of accounts) {
        await this.transactionModel.aggregate([
          {
            $match: {
              accountId: {
                $eq: Types.ObjectId(account._id),
              },
            },
          },
          {
            $group: {
              _id: {
                id: account.id,
                title: account.title,
                currency: (account as any)._doc.currency,
              },
              totalEarned: {
                $sum: {
                  $cond: { if: { $gte: ['$amount', 0] }, then: '$amount', else: 0 },
                },
              },
              countEarned: {
                $sum: {
                  $cond: { if: { $gte: ['$amount', 0] }, then: 1, else: 0 },
                },
              },
              totalSpent: {
                $sum: {
                  $cond: { if: { $lt: ['$amount', 0] }, then: '$amount', else: 0 },
                },
              },
              countSpent: {
                $sum: {
                  $cond: { if: { $lt: ['$amount', 0] }, then: 1, else: 0 },
                },
              },
            },
          },
        ], (err, res) => {
          if (err) {
            reject(err);
          } else {
            reports.push(res[0]);
          }
        });
      }
      resolve(reports);
    });
  }

  async mockCreate(dtos: CreateTransactionDto[]) {
    for (const createTransactionDto of dtos) {
      await this.accountsService.accountTransaction(createTransactionDto.accountId, createTransactionDto.amount);
      const category = await this.categoriesService.categoryById(createTransactionDto.categoryId);
      const record: TransactionT = {
        accountId: createTransactionDto.accountId,
        amount: -createTransactionDto.amount,
        category,
        message: createTransactionDto.message,
        createdAt: createTransactionDto.createdAt,
      };
      await this.transactionModel.create(record);
    }
  }

  async getForAccount(accountId: string): Promise<Transaction[]> {
    return new Promise((resolve, reject) => {
      this.transactionModel.find({ accountId }).sort([['createdAt', -1]]).exec((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  async delete(id: string): Promise<Transaction | null> {
    return new Promise((resolve, reject) => {
      this.transactionModel.findByIdAndDelete(id, (err, res) => {
        if (err || res == null) {
          reject(err);
        } else {
          this.accountsService.accountTransaction(res.accountId, res.amount);
          resolve(res);
        }
      });
    });
  }

  async totalSpent(): Promise<TotalSpentDto> {
    return new Promise((resolve, reject) => {
      this.transactionModel.aggregate([{
        $group: {
          _id: { categoryId: '$category._id', name: '$category.title' },
          totalAmount: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      }], (err, response) => {
        if (err) {
          reject(err);
        } else {
          console.log(response);
          resolve(response);
        }
      });
    });
  }
}
