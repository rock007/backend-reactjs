
import http from './httpService';
import AppConsts from '../lib/appconst';

class SysService {

  public async getDetpTree(): Promise<any> {
   
    let result = await http.get('/getDeptTreeByUid',{params:{uid:AppConsts.session.userId}});
    //let result = await http.get('rest/sys/getDeptTree');
    return result;
  }

}

export default new SysService();
