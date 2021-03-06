import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account, AccountT } from '../mongo/account.schema';
import { CreateAccountDto } from './dto/createAccount.dto';

@Injectable()
export class AccountsService {
  constructor(@InjectModel('Account') private readonly accountModel: Model<Account>) {
  }

  async create(createAccountDto: CreateAccountDto, ownerId: string): Promise<Account> {
    const data: AccountT = {
      currency: createAccountDto.currency,
      currentAmount: createAccountDto.currentAmount,
      ownerId,
      title: createAccountDto.title,
      type: createAccountDto.type,
    };
    return this.accountModel.create(data);
  }

  async delete(id: string): Promise<Account | null> {
    return new Promise((resolve, reject) => {
      this.accountModel.findByIdAndDelete(id, (err, res) => {
        if (err || res == null) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  async getAll(ownerId: string): Promise<Account[]> {
    return new Promise((resolve, reject) => {
      this.accountModel.find({ ownerId }, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  async accountTransaction(id: string, amount: number): Promise<Account> {
    return new Promise((resolve, reject) => {
      this.accountModel.findByIdAndUpdate(id, { $inc: { currentAmount: -amount } }, (err, res) => {
        if (err || res == null) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  changeRemaining(id: string, amount: number): Promise<Account | null> {
    return new Promise((resolve, reject) => {
      this.accountModel.findByIdAndUpdate(id,
        {
          currentAmount: amount,
        }, (err, res) => {
          if (err || !res) {
            reject(err);
          } else {
            resolve(res);
          }
        });
    });
  }
}
