import { observable, action } from 'mobx';
import LoginResultOutput from '../services/account/dto/LoginResultOutput';
import SysService from '../services/SysService';
import { PermissionModelInput } from '../services/dto/PermissionModel';

class PermissionEditStore {
  
  @observable record: PermissionModelInput ;

  @observable result: any ;

  @observable selectedRows: Array<any> =[];
  //@observable selectedLength: number =0;

  @action
  public submit = async (input :PermissionModelInput) => {
    this.result = await SysService.submitPermission(input);
  };

  @action
  public loadRecord = async (id: string) => {
    
    debugger;
    const result = await SysService.getPermissionById(id);

    this.record =result;
  };

  public updateSelectRows=(selecteds)=>{

    this.selectedRows=selecteds;
  //  this.selectedLength=selecteds.length;

  }

}

export default PermissionEditStore;
