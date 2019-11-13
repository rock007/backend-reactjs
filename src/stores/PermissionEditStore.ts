import { observable, action } from 'mobx';
import SysService from '../services/SysService';
import { PermissionModel } from '../services/dto/SystemModel';

class PermissionEditStore {
  
  @observable record: PermissionModel ;

  @observable result: any ;

  @observable selectedRows: Array<any> =[];
  //@observable selectedLength: number =0;

  @action
  public submit = async (input :PermissionModel) => {
    this.result = await SysService.submitPermission(input);
  };

  @action
  public loadRecord = async (id: string) => {
    
    const result = await SysService.getPermissionById(id);

    this.record =result;
  };

  public updateSelectRows=(selecteds)=>{

    this.selectedRows=selecteds;
  //  this.selectedLength=selecteds.length;

  }

}

export default PermissionEditStore;
