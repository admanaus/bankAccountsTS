import {IPerson} from '../interfaces/person';
import {IAccount} from '../interfaces/account'

class Person implements IPerson {
    name: string;
    dateOfBirth: Date;
    checkingAccount: IAccount;
    savingsAccount: IAccount;
    retirementAccount: IAccount;
}

export { Person };