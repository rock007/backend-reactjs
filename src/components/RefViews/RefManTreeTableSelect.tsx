import * as React from 'react';
import {Radio} from 'tinper-bee';

import { RefTreeTableWithInput } from 'ref-tree-table'
import 'ref-tree-table/lib/index.css';

import SysService from '../../services/SysService';
import ManService from '../../services/ManService';
import { convertOrgTreeNode } from '../../utils/tools';
import { PageModel } from '../../services/Model/Models';

interface IComponentProps {
   // form:any
}
interface IComponentState {
    loading:boolean,
    treeData:any,
    tablePage:PageModel<any>,
    matchData?:any,
    value?:string
    showModal:boolean,
    selectedRowIndex:number
}
export  class RefManTreeTableSelect extends React.Component<IComponentProps,IComponentState> {

    orgId:string
    pageIndex:number=1;
    pageSize:number=10;

    state:IComponentState={
        loading:false,
        treeData:[],
        tablePage:new PageModel(),
        matchData:[],
        showModal:false,
        selectedRowIndex:-1
    }
    componentDidMount() {

        //let data = await SysService.getDetpTree();
        //this.setState({treeData:data.childs});
    }
  
    canClickGoOn = async () =>{
       
        const data = await SysService.getDetpTree();
        const treeData=convertOrgTreeNode(data);
      
        this.setState({treeData: treeData.children});

        return true;//必须要有
      }

      onSave = (result) =>{
        this.setState({
            matchData:result,
        })
      }

      clearFunc = () =>{
        this.setState({
            matchData:[],
        },()=>{
         //   this.props.form.setFieldsValue({table3:''});
        })
      }
       
      onCancel = () => {
        this.setState({ showModal: false })
      }

      onTreeChange = (record) => {

       if(record!=null&&record.length>0){
          this.setState({loading:true});
          this.orgId=record[0].key;
          this.loadData({orgIdSelected:this.orgId})
       }
      }

      loadData=async (arg)=>{

        let page = await ManService.search(arg,this.pageIndex,this.pageSize) as PageModel<any>;

        this.setState({tablePage:page,loading:false});
      }

      /**
      * @msg: 右表上的搜索回调
      * @param {type} 
      * @return: 
      */
      onTableSearch = (value) => {

        if(value!=null){

          this.pageIndex=1;
          this.setState({loading:true});
          this.loadData({realName:value,orgIdSelected:this.orgId});
        }
      }
      loadTableData = (param) => {

        console.log('loadTableData', param);
       
        if(param['refClientPageInfo.currPageIndex']!=null){

          this.setState({loading:true});
          this.pageIndex=param['refClientPageInfo.currPageIndex']+1;
          this.pageSize=param['refClientPageInfo.pageSize'];
          this.loadData({orgIdSelected:this.orgId});
        }

      }
      getSelectedDataFunc = (record,index) => {
        console.log("record", record, "index",index);

        this.setState({
            selectedRowIndex:index
        })
    };
     
    render() {

        const {treeData,matchData,value} = this.state;

        const pageData= this.state.tablePage.data;

        pageData.forEach(element => {
          element['key']=element.manId;
        });

        const columns = [
          { title: 'manId', dataIndex: 'manId', key: 'manId',textAlign:'center', isShow:false,width: 100 },
          { title: '姓名', dataIndex: 'realName', key: 'realName',textAlign:'center', width: 100 },
          { title: '性别', dataIndex: 'sex', key: 'sex', textAlign:'center',width: 80 },
          { title: '联系方式', dataIndex: 'linkPhone', key: 'linkPhone',textAlign:'center', width: 120 },
          { title: '身份证号', dataIndex: 'idsNo', key: 'idsNo',textAlign:'center', width: 180 },
          { title: '人员类别', dataIndex: 'cateType', key: 'cateType',textAlign:'center', width: 180 },
          { title: '风险等级', dataIndex: 'level', key: 'level',textAlign:'center', width: 180 },
          { title: '备注', dataIndex: 'remarks', key: 'remarks',textAlign:'center', width: 200 },
          { title: '社区', dataIndex: 'orgName', key: 'orgName',textAlign:'center', width: 200 }
          ];

        const page = {
            pageCount:  this.state.tablePage.totalPage,
            currPageIndex:  (this.state.tablePage.pageIndex-1),
            totalElements:  this.state.tablePage.dataCount,
        };

        return (  <RefTreeTableWithInput
          title="戒毒人员选择"
          lang= "zh_CN"
          value={value}
          showLoading={this.state.loading}
          valueField={ 'id'}
          //WithInput
          canClickGoOn={this.canClickGoOn}
          placeholder='请选择戒毒人员'
         
          displayField={ (record) => {
            return record.realName;
          }} 
          onSave={this.onSave}
          onCancel={this.onCancel}

          //table
          miniSearch= {true}
          multiple= {false}
          columnsData={columns}
          tableData={pageData}
          page={page}
          loadTableData={this.loadTableData}
          onTableSearch={this.onTableSearch}
          matchData={matchData}
          tableProps = {{
            rowClassName:(record,index,indent)=>{
              if (index === this.state.selectedRowIndex) {
                  return 'selected';
              } else {
                  return '';
              }
            },
            getSelectedDataFunc:this.getSelectedDataFunc
          }}
          
          //树
          searchable={false}
          showLine={true}
          nodeDisplay={ (record) => {
            return record.title
          }}
          treeData={this.state.treeData}
          onTreeChange={this.onTreeChange}
        />)
    }
}

export default RefManTreeTableSelect;