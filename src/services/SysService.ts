
import http from './httpService';
import AppConsts from '../lib/appconst';

class SysService {

  public async getDetpTree(): Promise<any> {
   
    let result = await http.get('/rest/getDeptTreeByUid',{params:{uid:AppConsts.session.userId}});
    //let result = await http.get('rest/sys/getDeptTree');
    return result;
  }

  public async getManCateTree(): Promise<any> {
   
    let result = await http.get('/rest/getCategroryTree');
    return result;
  }
  public async getDict(type:number): Promise<any> {
   
    let result = await http.get('/rest/getDict',{params:{type:type}});
   
    return result;
  }

  public async searchOrg(name:string,parentId:string,pageIndex:number=1,pageSize:number=20): Promise<any> {
   
    let result = await http.post('/rest/org-search?pageIndex='+pageIndex+'&pageSize='+pageSize,
                                {"uid":"22222","deptName":name,"superId":parentId}
                        );
    return result;
  }

  public async searchAccount(arg:any,pageIndex:number=1,pageSize:number=20): Promise<any> {
   
    let result = await http.post('/rest/account-search?pageIndex='+pageIndex+'&pageSize='+pageSize,
                                arg
                        );
    return result;
  }

  public async searchRole(): Promise<any> {
   
    var mm=new Map([
      [ "apple", 10 ],
      [ "banana", 20 ],
      [ "carraot", 30 ]
  ]);
    let result = await http.post('/rest/role-search',{parameters:{"uid":"22222","sex":12}});
    return result;
  }

  public async getAllMenu(): Promise<any> {
   
    let result = await http.get('/rest/getPermissionTreeAll');
    return result;
  }
  public async searchPermissionBy(args:any,pageIndex:number=1,pageSize:number=20): Promise<any> {
   
    let result = await http.post('/rest/permission-search?pageIndex='+pageIndex+'&pageSize='+pageSize,args);
    return result;
  }
  public async getPermissionById(id:string): Promise<any> {
   
    let result = await http.get('/rest/getPermissionById',{params:{"id":id}});
    return result;
  }
  public async submitPermission(body:any): Promise<any> {
   
    let result = await http.post('/rest/submitPermission',body);
    return result;
  }
  public async delPermission(body:any): Promise<any> {
   
    let result = await http.post('/rest/deletePermissionById',body);
    return result;
  }

}

export default new SysService();
