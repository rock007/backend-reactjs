
import http from './httpService';
const qs = require('qs');

class ReportService {
  
  //业务日报
  public async searchReportDaily(args:any,pageIndex:number=1,pageSize:number=20): Promise<any> {
    let result = await http.post('/rest/report/buss-daily',args,{params:{pageIndex:pageIndex,pageSize:pageSize}});
    return result;
  }
  
  //业务月报
  public async searchReportMonth(args:any,pageIndex:number=1,pageSize:number=20): Promise<any> {
    let result = await http.post('/rest/report/buss-month',args,{params:{pageIndex:pageIndex,pageSize:pageSize}});
    return result;
  }
}

export default new ReportService();
