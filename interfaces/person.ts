import { IAccount } from './account'

export interface IPerson{
    name: string;
    dateOfBirth: Date;
    checkingAccount: IAccount;
    savingsAccount: IAccount;
    retirementAccount: IAccount;
}
