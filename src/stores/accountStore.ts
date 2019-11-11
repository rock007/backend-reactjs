import { observable, action } from 'mobx';
import LoginResultOutput from '../services/account/dto/LoginResultOutput';
import AccountService from '../services/account/AccountService';

class AccountStore {
  
  @observable loginResult: LoginResultOutput = new LoginResultOutput();

  @action
  public login = async (username: string,password:string) => {
    this.loginResult = await AccountService.login({ username: username,password:password,grant_type:'password',scope:'all' });
  };
}

export default AccountStore;
