
import http from './httpService';
const qs = require('qs');

class ManService {

  public async search(args:any): Promise<any> {
    let result = await http.post('/rest/man/search',qs.stringify(args));
    return result;
  }

}

export default new ManService();
