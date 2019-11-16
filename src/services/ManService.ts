
import http from './httpService';
const qs = require('qs');

class ManService {

  public async search(args:any,pageIndex:number=1,pageSize:number=10): Promise<any> {
    let result = await http.post('/rest/man-search?pageIndex='+pageIndex+'&pageSize='+pageSize,args);
    return result;
  }

  public async searchProces(args:any,pageIndex:number=1,pageSize:number=20): Promise<any> {
    let result = await http.post('/rest/process-search?pageIndex='+pageIndex+'&pageSize='+pageSize,args);
    return result;
  }

  public async searchNiaojian(args:any,pageIndex:number=1,pageSize:number=20): Promise<any> {
    let result = await http.post('/rest/niaojian-search?pageIndex='+pageIndex+'&pageSize='+pageSize,args);
    return result;
  }
  
  public async searchNiaojianPlan(args:any,pageIndex:number=1,pageSize:number=20): Promise<any> {
    let result = await http.post('/rest/niaojianPlan-search?pageIndex='+pageIndex+'&pageSize='+pageSize,args);
    return result;
  }

  public async searchVisit(args:any,pageIndex:number=1,pageSize:number=20): Promise<any> {
    let result = await http.post('/rest/visit-search?pageIndex='+pageIndex+'&pageSize='+pageSize,args);
    return result;
  }

  //请假
  public async searchDayoff(args:any,pageIndex:number=1,pageSize:number=20): Promise<any> {
    let result = await http.post('/rest/dayoff-search?pageIndex='+pageIndex+'&pageSize='+pageSize,args);
    return result;
  }

  public async search4Help(args:any,pageIndex:number=1,pageSize:number=20): Promise<any> {
    let result = await http.post('/rest/help-search?pageIndex='+pageIndex+'&pageSize='+pageSize,args);
    return result;
  }

  //签到
  public async searchCheckin(args:any,pageIndex:number=1,pageSize:number=20): Promise<any> {
    let result = await http.post('/rest/checkin-search?pageIndex='+pageIndex+'&pageSize='+pageSize,args);
    return result;

  }
  
  //位置人员
  public async searchLocationMan(args:any,pageIndex:number=1,pageSize:number=20): Promise<any> {
    let result = await http.post('/rest/location-man-search?pageIndex='+pageIndex+'&pageSize='+pageSize,args);
    return result;
  }
  //位置
  public async searchLocation(args:any,pageIndex:number=1,pageSize:number=20): Promise<any> {
    let result = await http.post('/rest/location-search?pageIndex='+pageIndex+'&pageSize='+pageSize,args);
    return result;
  }

  public async submitMan(args:any): Promise<any> {
    let result = await http.post('/rest/man-submit',args);
    return result;
  }

  public async submitRelate(args:any): Promise<any> {
    let result = await http.post('/rest/relate-submit',args);
    return result;
  }


}

export default new ManService();
