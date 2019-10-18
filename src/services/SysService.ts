
import http from './httpService';

class SysService {

  public async getDetpTree(): Promise<any> {
    let result = await http.get('rest/sys/getDeptTree');
    return result;
  }

}

export default new SysService();
