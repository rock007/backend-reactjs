
import http from './httpService';
const qs = require('qs');

class ManService {

  public async search(args:any,pageIndex:number=1,pageSize:number=10): Promise<any> {
    let result = await http.post('/rest/man-search?pageIndex='+pageIndex+'&pageSize='+pageSize,args);
    return result;
  }
  //社戒情况
  public async searchProces(args:any,pageIndex:number=1,pageSize:number=20): Promise<any> {
    let result = await http.post('/rest/process-search?pageIndex='+pageIndex+'&pageSize='+pageSize,args);
    return result;
  }
  public async findProcessById(id:string): Promise<any> {
    let result = await http.get('/rest/process-get',{params:{processId:id}});
    return result;
  }
  
  public async deleteProcessByIds(ids:string): Promise<any> {
    let result = await http.get('/rest/process-delete',{params:{ids:ids}});
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
  
  //尿检计划
  public async searchNiaojianPlan(args:any,pageIndex:number=1,pageSize:number=20): Promise<any> {
    let result = await http.post('/rest/niaojian-plan-search?pageIndex='+pageIndex+'&pageSize='+pageSize,args);
    return result;
  }

  public async submitNiaojianGenerate(args:any): Promise<any> {
    let result = await http.post('/rest/niaojian-plan-generate',args);
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

  //戒毒人员
  public async getManLog(id:string): Promise<any> {
    let result = await http.get('/rest/man-log',{params:{manId:id}});
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

  //社区报到(附件)
  public async submitRegist(args:any): Promise<any> {
    let result = await http.post('/rest/process-regist',args);
    return result;
  }

  public async getProcessFiles(id:string): Promise<any> {
    let result = await http.get('/rest/process-files',{params:{processId:id}});
    return result;
  }
  //社区转移
  public async submitTran(args:any): Promise<any> {
    let result = await http.post('/rest/process-tran',args);
    return result;
  }
  //解除戒毒
  public async submitRelease(args:any): Promise<any> {
    let result = await http.post('/rest/process-release',args);
    return result;
  }
  //执行强戒
  public async submitBack(args:any): Promise<any> {
    let result = await http.post('/rest/process-back',args);
    return result;
  }

  //社戒修改 
  public async submitBussUpdate(args:any): Promise<any> {
    let result = await http.post('/rest/buss-update',args);
    return result;
  }
  public async submitBussAudit(args:any): Promise<any> {
    let result = await http.post('/rest/buss-audit',args);
    return result;
  }

}

export default new ManService();
