import * as React from 'react';

import {FormControl ,Radio} from 'tinper-bee';

import { RefTreeTableWithInput } from 'ref-tree-table'
import 'ref-tree-table/lib/index.css';

import SysService from '../../services/SysService';
import { convertOrgTreeNode } from '../../utils/tools';
import { PageModel } from '../../services/Model/Models';

interface IComponentProps {
   // form:any
}
interface IComponentState {
    loading:boolean,
    //pageCount:number,
    //totalElements:number,
    treeData:any,
    matchData?:any,
    value?:string
    showModal:boolean,

    tablePage:PageModel<any>,
}
export  class RefUserTreeTableSelect extends React.Component<IComponentProps,IComponentState> {

    orgId:string='';
    pageIndex:number=1;
    pageSize:number=10;

    state:IComponentState={
        loading:false,
        //pageCount:-1,
        //totalElements:0,
        treeData:[],
        matchData:[],//{name:'用友集团',refname:'用友集团',code:'001'}
        value:'',/***JSON.stringify({
                refname: "用友集团",
                refpk: "001",  //value中指定的refpk要等于valueField对应的字段
        })**/
        showModal:false,

        tablePage:new PageModel(),
    }

    componentDidMount() {

    }
  
    canClickGoOn = async () =>{
       
      let data = await SysService.getDetpTree();
      let treeData=convertOrgTreeNode(data);
      
      this.setState({treeData: treeData.key!=='0'?[treeData]:treeData.children});
      return true;
  }

    onSave = (result) =>{
        this.setState({
            matchData:result,
        })
    }
    clearFunc = () =>{
        this.setState({
            matchData:[],
        })
      }
      searchFilterInfo = (value) => {
        alert('搜索' + JSON.stringify(value))
      }
    
      /**
       * 跳转到制定页数的操作
       * @param {number} index 跳转页数
       */
      handlePagination = (index) => {
        //this.page.currPageIndex = index;
        //this.setState({ number: Math.random() })
      }
        /**
         * 选择每页数据个数
         */
      dataNumSelect = (index, pageSize) => {
        console.log(index, pageSize)
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

        let page = await SysService.searchAccount(arg,this.pageIndex,this.pageSize) as PageModel<any>;

        this.setState({tablePage:page,loading:false});
      }

      /**
       * @msg: 左树上的搜索回调
       * @param {type} 
       * @return: 
       */
      onTreeSearch = (value) => {
        alert(value);
      }
      /**
      * @msg: 右表上的搜索回调
      * @param {type} 
      * @return: 
      */
      onTableSearch = (value) => {
        console.log('onTableSearch', value)
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

    render() {

        const pageData= this.state.tablePage.data;

        pageData.forEach(element => {
          element['key']=element.manId;
        });

        const columns = [
            { title: '姓名', dataIndex: 'trueName', key: 'trueName', textAlign:'center', width: 120 },
            { title: '性别', dataIndex: 'sex', key: 'sex', width: 80, textAlign:'center' ,render(text,record,index) {

              if(text==null||text=='') return '';
              return text===1?'男':'女';
            }},
            { title: '手机号', dataIndex: 'mobile', key: 'mobile', textAlign:'center', width: 150 },
            { title: '社区部门', dataIndex: 'dept', key: 'dept', textAlign:'center', width: 180 ,render(text,record,index) {

              return text==null?'':text.deptName;
            }},
            { title: '角色', dataIndex: 'roles', key: 'roles', textAlign:'center', width: 150 ,render(text,record,index) {

              return text;
            }},
          ];

        const page = {
            pageCount:  this.state.tablePage.totalPage,
            currPageIndex:  (this.state.tablePage.pageIndex-1),
            totalElements:  this.state.tablePage.dataCount,
        };

        return (<RefTreeTableWithInput
            {...this.props}
            title="社区人员选择"
            lang= "zh_CN"
            miniSearch= {true}
            multiple= {true}

            nodeDisplay={ (record) => {
              return record.title
            }}
            displayField={ (record) => {
              return record.trueName
            }}  //显示内容的键
            valueField={ 'id'} 
            showLine={true}
            treeData={this.state.treeData}
            columnsData={columns}
            tableData={pageData}
            page={page}
           //!! matchData={this.state.matchData}
         //!!   value={this.state.value}
          
            canClickGoOn={this.canClickGoOn}

            searchable={false}
            onTreeChange={this.onTreeChange}
            onTreeSearch={this.onTreeSearch}
            onTableSearch={this.onTableSearch}
            onSave={this.onSave}
            onCancel={this.onCancel}
            loadTableData={this.loadTableData}

        />)
    }
}

export default RefUserTreeTableSelect;