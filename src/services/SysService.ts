
import http from './httpService';
import AppConsts from '../lib/appconst';

class SysService {

  public async getDetpTree(): Promise<any> {
   
    //let result = await http.get('/rest/getDeptTreeByUid',{params:{uid:AppConsts.session.userId}});
    let result = await http.get('/rest/getDeptTreeByUid');
    
    return result;
  }

  public async getAreaTree(areaId:string=''): Promise<any> {
   
    let result = await http.get('/rest/getAreaTreeById',{params:{areaId:areaId}});
    
    return result;
  }
  public async searchArea(args:any,pageIndex:number=1,pageSize:number=20): Promise<any> {
   
    let result = await http.post('/rest/area-search?pageIndex='+pageIndex+'&pageSize='+pageSize,args);
    return result;
  }
  public async deleteAreaByIds(ids:string): Promise<any> {
    let result = await http.get('/rest/area-delete',{params:{ids:ids}});
    return result;
  }

  //网格
  public async searchGrid(args:any,pageIndex:number=1,pageSize:number=20): Promise<any> {
   
    let result = await http.post('/rest/grid-search?pageIndex='+pageIndex+'&pageSize='+pageSize,args);
    return result;
  }
  public async deleteGridByIds(ids:string): Promise<any> {
    let result = await http.get('/rest/grid-delete',{params:{ids:ids}});
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
                                {"deptName":name,"superId":parentId}
                        );
    return result;
  }

  public async searchAccount(arg:any,pageIndex:number=1,pageSize:number=20): Promise<any> {
   
    let result = await http.post('/rest/account-search?pageIndex='+pageIndex+'&pageSize='+pageSize,
                                arg
                        );
    return result;
  }

  public async searchRole(args): Promise<any> {
   
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

  //上传文件
  public async upload(files:any): Promise<any> {
   
    var formData = new FormData();
    //var imagefile = document.querySelector('#file');
    formData.append("files", files);

    let result = await http.post('/web/rest/file/upload',formData,
      {
        headers:{'Content-Type':'multipart/form-data'}
      });
    return result;
  }

  public async download(fileId:string): Promise<any> {
   
    let result = await http.get('/web/rest/file/download',{params:{id:fileId}});
    return result;
  }

}

export default new SysService();
