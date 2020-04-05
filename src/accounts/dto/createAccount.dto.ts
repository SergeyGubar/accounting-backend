import { AccountType, Currency } from '../../mongo/account.schema';

export interface CreateAccountDto extends Readonly<CreateAccountDto> {
  title: string;
  currentAmount: number;
  currency: Currency;
  type: AccountType;
}
