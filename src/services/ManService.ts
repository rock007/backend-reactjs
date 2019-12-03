
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
  public async submitNiaojian(args:any): Promise<any> {
    let result = await http.post('/rest/niaojian-submit',args);
    return result;
  }
  public async deleteNiaojian(ids:string): Promise<any> {
    let result = await http.get('/rest/niaojian-delete',{params:{ids:ids}});
    return result;
  }
  public async findNiaojianById(id:string): Promise<any> {
    let result = await http.get('/rest/niaojian-get',{params:{id:id}});
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
  public async findVisitById(id:string): Promise<any> {
    let result = await http.get('/rest/visit-get',{params:{id:id}});
    return result;
  }
  public async submitVisit(args:any): Promise<any> {
    let result = await http.post('/rest/visit-submit',args);
    return result;
  }
  public async deleteVisit(ids:string): Promise<any> {
    let result = await http.get('/rest/visit-delete',{params:{ids:ids}});
    return result;
  }

  //请假
  public async searchDayoff(args:any,pageIndex:number=1,pageSize:number=20): Promise<any> {
    let result = await http.post('/rest/dayoff-search?pageIndex='+pageIndex+'&pageSize='+pageSize,args);
    return result;
  }
  public async findDayoffById(id:string): Promise<any> {
    let result = await http.get('/rest/dayoff-get',{params:{id:id}});
    return result;
  }
  public async submitDayoffAudit(args:any): Promise<any> {
    let result = await http.post('/rest/dayoff-audit',args);
    return result;
  }

  public async search4Help(args:any,pageIndex:number=1,pageSize:number=20): Promise<any> {
    let result = await http.post('/rest/help-search?pageIndex='+pageIndex+'&pageSize='+pageSize,args);
    return result;
  }
  public async find4HelpById(id:string): Promise<any> {
    let result = await http.get('/rest/help-get',{params:{id:id}});
    return result;
  }
  public async submit4HelpResp(args:any): Promise<any> {
    let result = await http.post('/rest/help-resp',args);
    return result;
  }

  //签到
  public async searchCheckin(args:any,pageIndex:number=1,pageSize:number=20): Promise<any> {
    let result = await http.post('/rest/checkin-search?pageIndex='+pageIndex+'&pageSize='+pageSize,args);
    return result;
  }
  public async submitCheckinInvalid(ids:string): Promise<any> {
    let result = await http.get('/rest/checkin-invalid-set',{params:{ids:ids}});
    return result;
  }

  public async findCheckinById(id:string): Promise<any> {
    let result = await http.get('/rest/checkin-get',{params:{id:id}});
    return result;
  }
  public async submitCheckinAudit(args:any): Promise<any> {
    let result = await http.post('/rest/checkin-audit',args);
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
  public async findManById(id:string): Promise<any> {
    let result = await http.get('/rest/findManById',{params:{id:id}});
    return result;
  }
  
  public async deleteManByIds(ids:string): Promise<any> {
    let result = await http.get('/rest/man-delete',{params:{ids:ids}});
    return result;
  }

  //亲属
  public async submitRelate(args:any): Promise<any> {
    let result = await http.post('/rest/relate-submit',args);
    return result;
  }
  public async deleteRelate(ids:string): Promise<any> {
    let result = await http.get('/rest/relate-delete',{params:{ids:ids}});
    return result;
  }
  public async searchRelate(args:any,pageIndex:number=1,pageSize:number=20): Promise<any> {
    let result = await http.post('/rest/relate-search',args,{params:{pageIndex:pageIndex,pageSize:pageSize}});
    return result;
  }

  //工作
  public async submitWork(args:any): Promise<any> {
    let result = await http.post('/rest/work-submit',args);
    return result;
  }
  public async deleteWork(ids:string): Promise<any> {
    let result = await http.get('/rest/work-delete',{params:{ids:ids}});
    return result;
  }
  public async searchWork(args:any,pageIndex:number=1,pageSize:number=20): Promise<any> {
    let result = await http.post('/rest/work-search',args,{params:{pageIndex:pageIndex,pageSize:pageSize}});
    return result;
  }
  //六保一
  public async submitContact(args:any): Promise<any> {
    let result = await http.post('/rest/contact-submit',args);
    return result;
  }
  public async deleteContact(ids:string): Promise<any> {
    let result = await http.get('/rest/contact-delete',{params:{ids:ids}});
    return result;
  }
  public async searchContact(args:any,pageIndex:number=1,pageSize:number=20): Promise<any> {
    let result = await http.post('/rest/contact-search',args,{params:{pageIndex:pageIndex,pageSize:pageSize}});
    return result;
  }

}

export default new ManService();
