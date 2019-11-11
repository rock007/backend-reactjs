
import http from './httpService';
import AppConsts from '../lib/appconst';

class SysService {

  public async getDetpTree(): Promise<any> {
   
    let result = await http.get('/getDeptTreeByUid',{params:{uid:AppConsts.session.userId}});
    //let result = await http.get('rest/sys/getDeptTree');
    return result;
  }

  public async getManCateTree(): Promise<any> {
   
    let result = await http.get('/getCategroryTree');
    return result;
  }
  public async getDict(type:number): Promise<any> {
   
    let result = await http.get('/getDict',{params:{type:type}});
   
    return result;
  }

  public async searchOrg(name:string,parentId:string,pageIndex:number=1,pageSize:number=20): Promise<any> {
   
    let result = await http.post('/org-search?pageIndex='+pageIndex+'&pageSize='+pageSize,
                                {"uid":"22222","deptName":name,"superId":parentId}
                        );
    return result;
  }

  public async searchAccount(arg:any,pageIndex:number=1,pageSize:number=20): Promise<any> {
   
    let result = await http.post('/account-search?pageIndex='+pageIndex+'&pageSize='+pageSize,
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
    let result = await http.post('/role-search',{parameters:{"uid":"22222","sex":12}});
    return result;
  }

  public async getAllMenu(): Promise<any> {
   
    let result = await http.get('/getPermissionTreeAll');
    return result;
  }
  public async getPermissionByParentId(parentId:string): Promise<any> {
   
    let result = await http.get('/getPermissionByParentId',{params:{"parentId":parentId}});
    return result;
  }
  public async getPermissionById(id:string): Promise<any> {
   
    let result = await http.get('/getPermissionById',{params:{"id":id}});
    return result;
  }
  public async submitPermission(body:any): Promise<any> {
   
    let result = await http.post('/submitPermission',body);
    return result;
  }

}

export default new SysService();
