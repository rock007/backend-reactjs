
import { RegisterInput } from './dto/RegisterInput';
import { RegisterOutput } from './dto/RegisterOutput';

import { LoginModelInput } from './dto/LoginModelInput';
import  LoginResultOutput  from './dto/LoginResultOutput';
import http from '../httpService';

class AccountService {
  
  public async register(input: RegisterInput): Promise<RegisterOutput> {
    let result = await http.post('/rest/account/register', input);
    return result.data.result;
  }

  //fuck no
  public async login(input: LoginModelInput): Promise<LoginResultOutput> {
    
    let result = await http.get('/web/oauth/token',{params:input,headers:[{"Authorization":"Basic dGVzdDE6dGVzdDExMTE="},{"Content-Type": "application/x-www-form-urlencoded"}]});
   
    return result.data.result;
  }

  public async myProfile(): Promise<any> {
    
    let result = await http.post('/rest/manager/myProfile',{time:new Date().getTime});
   
    return result.data.result;
  }
}


export default new AccountService();
