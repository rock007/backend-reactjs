import { observable, action } from 'mobx';
import ManService from '../services/ManService';
import { PermissionModel } from '../services/dto/SystemModel';
import { PageModel } from '../services/Model/Models';

class ManStore {
  
  @observable data: Array<any> =[] ;

  @observable selectedRows: Array<any> =[];

  @action
  public submit = async (input :PermissionModel) => {
    //this.result = await SysService.submitPermission(input);
  };

  @action
  public loadRecord = async (arg: any,pageIndex:number,pageSize:number) => {
    
    let page = await ManService.search(arg,pageIndex,pageSize) as PageModel<any>;

    //this.setState({page:page,isLoading:false});

    this.data=page.data;
    this.selectedRows=[];


    //this.record =result;
  };

  public selected=(tableData,selecteds)=>{

    debugger;
    this.selectedRows=selecteds;
    this.data=tableData;
  //  this.selectedLength=selecteds.length;

  }

}

export default ManStore;
