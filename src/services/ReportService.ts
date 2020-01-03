
import http from './httpService';
const qs = require('qs');

class ReportService {
  
  //业务日报
  public async searchReportDaily(args:any,pageIndex:number=1,pageSize:number=20): Promise<any> {
    let result = await http.post('/rest/report/buss-daily-search',args,{params:{pageIndex:pageIndex,pageSize:pageSize}});
    return result;
  }
  
  //业务月报
  public async searchReportMonth(args:any,pageIndex:number=1,pageSize:number=20): Promise<any> {
    let result = await http.post('/rest/report/buss-month-search',args,{params:{pageIndex:pageIndex,pageSize:pageSize}});
    return result;
  }
  public async searchReportYear(args:any,pageIndex:number=1,pageSize:number=20): Promise<any> {
    let result = await http.post('/rest/report/buss-year-search',args,{params:{pageIndex:pageIndex,pageSize:pageSize}});
    return result;
  }
  //社工（业务统计）
  public async searchWorkDesc(args:any,pageIndex:number=1,pageSize:number=20): Promise<any> {
    let result = await http.post('/rest/worker-search',args,{params:{pageIndex:pageIndex,pageSize:pageSize}});
    return result;
  }
  public async findWorkDescById(id:string): Promise<any> {
    let result = await http.get('/rest/worker-get',{params:{id:id}});
    return result;
  }
  public async submitWorkerLink(args:any): Promise<any> {
    let result = await http.post('/rest/worker-link',args);
    return result;
  }

}

export default new ReportService();
