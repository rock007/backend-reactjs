import { observable, action } from 'mobx';
import ManService from '../services/ManService';
import { PermissionModel } from '../services/dto/SystemModel';
import { PageModel } from '../services/Model/Models';

class BeeGridStore {
  
  //@observable data: Array<any> =[] ;
  @observable page:PageModel<any>=new PageModel();

  @observable selectedRows: Array<any> =[];

  @action
  public loadRecord = async (arg: any,pageIndex:number,pageSize:number) => {
    
  };

  public selected=(tableData,selecteds)=>{

    this.selectedRows=selecteds;
    this.page.data=tableData;
  //  this.selectedLength=selecteds.length;

  }

  public initData(_page:PageModel<any>){

    this.page=_page;
    this.selectedRows=[];

  }

}

export default BeeGridStore;
