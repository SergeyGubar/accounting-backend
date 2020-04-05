import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AuthGuard } from '@nestjs/passport';
import { Account } from '../mongo/account.schema';
import { CreateAccountDto } from './dto/createAccount.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createAccount(@Body() createAccountDto: CreateAccountDto, @Request() req): Promise<Account> {
    return this.accountsService.create(createAccountDto, req.user.userId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  deleteAccount(@Param('id') id: string): Promise<Account | null> {
    return this.accountsService.delete(id);
  }

  @Get('allMy')
  @UseGuards(AuthGuard('jwt'))
  myAccounts(@Request() req): Promise<Account[]> {
    return this.accountsService.getAll(req.user.userId);
  }

}
