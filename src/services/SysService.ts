
import http from './httpService';
import AppConsts from '../lib/appconst';

class SysService {

  public async getDetpTree(flag:number=0): Promise<any> {
   
    //let result = await http.get('/rest/getDeptTreeByUid',{params:{uid:AppConsts.session.userId}});
    let result = await http.get('/rest/getOrgTree',{params:{flag:flag}});
    
    return result;
  }

  public async getAreaTree(areaId:string=''): Promise<any> {
   
    let result = await http.get('/rest/getAreaTree',{params:{areaId:areaId}});
    
    return result;
  }
  public async searchArea(args:any,pageIndex:number=1,pageSize:number=20): Promise<any> {
   
    let result = await http.post('/rest/area-search?pageIndex='+pageIndex+'&pageSize='+pageSize,args);
    return result;
  }
  public async submitArea(args:any): Promise<any> {
   
    let result = await http.post('/rest/area-submit', args);
    return result;
  }
  public async deleteAreaByIds(ids:string): Promise<any> {
    let result = await http.get('/rest/area-delete',{params:{ids:ids}});
    return result;
  }
  public async getAreaById(id:string): Promise<any> {
    let result = await http.get('/rest/area-get',{params:{id:id}});
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
  public async submitGrid(args:any): Promise<any> {
   
    let result = await http.post('/rest/grid-submit', args);
    return result;
  }
  public async getGridById(id:string): Promise<any> {
   
    let result = await http.get('/rest/grid-get', {params:{id:id}});
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
  public async submitOrg(args:any): Promise<any> {
   
    let result = await http.post('/rest/org-submit', args);
    return result;
  }
  public async deleteOrg(ids:string): Promise<any> {
   
    let result = await http.get('/rest/org-delete', {params:{ids:ids}});
    return result;
  }
  public async getOrgById(id:string): Promise<any> {
   
    let result = await http.get('/rest/org-get', {params:{id:id}});
    return result;
  }

  //帐号
  public async searchAccount(arg:any,pageIndex:number=1,pageSize:number=20): Promise<any> {
   
    let result = await http.post('/rest/account-search?pageIndex='+pageIndex+'&pageSize='+pageSize,
                                arg
                        );
    return result;
  }
  public async submitAccount(args:any): Promise<any> {
   
    let result = await http.post('/rest/account-submit', args);
    return result;
  }
  public async deleteAccount(ids:string): Promise<any> {
   
    let result = await http.get('/rest/account-delete', {params:{ids:ids}});
    return result;
  }
  public async getAccountById(id:string): Promise<any> {
   
    let result = await http.get('/rest/account-get', {params:{id:id}});
    return result;
  }
  //密码重置
  public async resetAccountPwd(ids:string): Promise<any> {
   
    let result = await http.get('/rest/account-reset', {params:{ids:ids}});
    return result;
  }
  //修改密码
  public async changePwd(args:any): Promise<any> {
   
    let result = await http.post('/rest/account-changpwd', args);
    return result;
  }

  public async searchRole(args): Promise<any> {
   
    var mm=new Map([
      [ "apple", 10 ],
      [ "banana", 20 ],
      [ "carraot", 30 ]
  ]);
    let result = await http.post('/rest/role-search',args);
    return result;
  }

  public async submitRole(args:any): Promise<any> {
   
    let result = await http.post('/rest/role-submit', args);
    return result;
  }
  public async deleteRole(ids:string): Promise<any> {
   
    let result = await http.get('/rest/role-delete', {params:{ids:ids}});
    return result;
  }
  public async getRoleById(id:string): Promise<any> {
   
    let result = await http.get('/rest/role-get', {params:{id:id}});
    return result;
  }
  public async submitRolePermisson(args:any): Promise<any> {
   
    let result = await http.post('/rest/role-permission-submit', args);
    return result;
  }
  public async getMyMenu(): Promise<any> {
   
    let result = await http.get('/rest/manager/get-permission');
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
  public async getPermissionByRoleId(id:string): Promise<any> {
   
    let result = await http.get('/rest/getPermissionByRoleId',{params:{roleId:id}});
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

  //消息
  public async searchMessage(args:any,pageIndex:number=1,pageSize:number=20): Promise<any> {
   
    let result = await http.post('/rest/msg-search?pageIndex='+pageIndex+'&pageSize='+pageSize,args);
    return result;
  }
  public async getMessageById(id:string): Promise<any> {
   
    let result = await http.get('/rest/msg-get',{params:{"id":id}});
    return result;
  }
  public async sendMessage(body:any): Promise<any> {
   
    let result = await http.post('/rest/msg-send',body);
    return result;
  }
  public async deleteMessage(ids:string): Promise<any> {
   
    let result = await http.get('/rest/msg-delete',{params:{ids:ids}});
    return result;
  }
  public async readMessage(ids:string): Promise<any> {
   
    let result = await http.get('/rest/msg-read',{params:{ids:ids}});
    return result;
  }

  //系统日志
  public async searchLog(args:any,pageIndex:number=1,pageSize:number=20): Promise<any> {
   
    let result = await http.post('/rest/log-search?pageIndex='+pageIndex+'&pageSize='+pageSize,args);
    return result;
  }

  //工作流
  public async myTodo(args:any): Promise<any> {
   
    let result = await http.get('/rest/manager/myTodo',{params:args});
    return result;
  }

  public async getFlowInfoBy(wfProcId:string): Promise<any> {
   
    let result = await http.get('/wf/getTasksByProcId',{params:{processInstanceId:wfProcId}});
    return result;
  }

  public async actWorkflow( taskId:string,args:any): Promise<any> {
   
    let result = await http.post('/rest/manager/actWorkflow?taskId='+taskId,args);
    return result;
  }

  //计划模板
  public async getAllScheduleTemplate(): Promise<any> {
   
    let result = await http.get('/rest/getAllScheduleTemplate');
   
    return result;
  }
  public async getScheduleTemplateById(id:string): Promise<any> {
   
    let result = await http.get('/rest/getScheduleTemplateById',{params:{id:id}});
   
    return result;
  }

}

export default new SysService();
