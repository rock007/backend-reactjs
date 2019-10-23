
import http from './httpService';
import AppConsts from '../lib/appconst';

class SysService {

  public async getDetpTree(): Promise<any> {
   
    let result = await http.get('/getDeptTreeByUid',{params:{uid:AppConsts.session.userId}});
    //let result = await http.get('rest/sys/getDeptTree');
    return result;
  }

  public async searchOrg(name:string,parentId:string,pageIndex:number=1,pageSize:number=20): Promise<any> {
   
    let result = await http.post('/org-search?pageIndex='+pageIndex+'&pageSize='+pageSize,
                                {"uid":"22222","deptName":name,"superId":parentId}
                        );
    return result;
  }

  public async searchRole(): Promise<any> {
   
    var mm=new Map([
      [ "apple", 10 ],
      [ "banana", 20 ],
      [ "carraot", 30 ]
  ]);
    let result = await http.post('/role-search',{parameters:{"uid":"22222","sex":12}});
    return result;
  }
  

}

export default new SysService();
