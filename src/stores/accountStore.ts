import { observable, action } from 'mobx';
import LoginResultOutput from '../services/account/dto/LoginResultOutput';
import AccountService from '../services/account/AccountService';

class AccountStore {
  
  @observable loginResult: LoginResultOutput = new LoginResultOutput();
  @observable loginInfo={username:'',password:''};

  @action
  public login = async (username: string,password:string) => {
    this.loginResult = await AccountService.login({ username: username,password:password,grant_type:'password',scope:'all' });
  };

  @action
  public initLogin = async (username: string,password:string) => {
    this.loginInfo = { username: username,password:password};
  };

}

export default AccountStore;
