
import http from './httpService';
const qs = require('qs');

class BussService {
  
  //红黄牌
  public async searchCard(args:any,pageIndex:number=1,pageSize:number=20): Promise<any> {
    let result = await http.post('/rest/card-search',args,{params:{pageIndex:pageIndex,pageSize:pageSize}});
    return result;
  }

  //通知函
  public async searchNotice(args:any,pageIndex:number=1,pageSize:number=20): Promise<any> {
    let result = await http.post('/rest/notice-search?pageIndex='+pageIndex+'&pageSize='+pageSize,args);
    return result;
  }

  //告诫书
  public async searchWarn(args:any,pageIndex:number=1,pageSize:number=20): Promise<any> {
    let result = await http.post('/rest/warn-search?pageIndex='+pageIndex+'&pageSize='+pageSize,args);
    return result;
  }

  //包办单位
  public async searchUnit(args:any,pageIndex:number=1,pageSize:number=20): Promise<any> {
    let result = await http.post('/rest/unit-search?pageIndex='+pageIndex+'&pageSize='+pageSize,args);
    return result;
  }
  public async deleteUnit(ids:string): Promise<any> {
    let result = await http.get('/rest/unit-delete',{params:{ids:ids}});
    return result;
  }


}

export default new BussService();
