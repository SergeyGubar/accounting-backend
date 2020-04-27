export interface TotalReportResultDto extends Readonly<TotalReportResultDto> {
  accountId: string;
  totalSpent: number;
  totalIncome: number;
}
