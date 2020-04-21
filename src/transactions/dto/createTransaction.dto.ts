export class CreateTransactionDto {
  accountId: string;
  amount: number;
  categoryId: string;
  message?: string;
  createdAt?: Date;
}
