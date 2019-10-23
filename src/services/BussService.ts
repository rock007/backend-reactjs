
import http from './httpService';
const qs = require('qs');

class BussService {
  
  //红黄牌
  public async searchCard(args:any): Promise<any> {
    let result = await http.post('/card-search',qs.stringify(args));
    return result;
  }

}

export default new BussService();
