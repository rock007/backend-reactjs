
import http from './httpService';
const qs = require('qs');

class ManService {

  public async search(args:any): Promise<any> {
    let result = await http.post('/man-search',qs.stringify(args));
    return result;
  }

  public async searchProces(args:any): Promise<any> {
    let result = await http.post('/process-search',qs.stringify(args));
    return result;
  }

  public async searchNiaojian(args:any): Promise<any> {
    let result = await http.post('/niaojian-search',qs.stringify(args));
    return result;
  }
  
  public async searchNiaojianPlan(args:any): Promise<any> {
    let result = await http.post('/niaojianPlan-search',qs.stringify(args));
    return result;
  }

  public async searchVisit(args:any): Promise<any> {
    let result = await http.post('/visit-search',qs.stringify(args));
    return result;
  }

  //请假
  public async searchDayoff(args:any): Promise<any> {
    let result = await http.post('/dayoff-search',qs.stringify(args));
    return result;
  }

  public async search4Help(args:any): Promise<any> {
    let result = await http.post('/help-search',qs.stringify(args));
    return result;
  }

  //签到
  public async searchCheckin(args:any): Promise<any> {
    let result = await http.post('/checkin-search',qs.stringify(args));
    return result;

  }
}

export default new ManService();
