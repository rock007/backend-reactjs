import * as React from 'react';

import { Radio} from 'tinper-bee';

import { RefTreeTableWithInput } from 'ref-tree-table'
import 'ref-tree-table/lib/index.css';

import request from '../../utils/request';
import { convertAreaTreeNode } from '../../utils/tools';
import { PageModel } from '../../services/Model/Models';
import { Warning } from '../../utils';

interface IComponentProps {
   // form:any
}
interface IComponentState {
    loading:boolean,
    //pageCount:number,
    //totalElements:number,
    treeData:any,
    tablePage:PageModel<any>,
    matchData?:any,//selected
    value?:string
    showModal:boolean
}
export  class RefGridTreeTableSelect extends React.Component<IComponentProps,IComponentState> {

    state:IComponentState={
        loading:false,
        //pageCount:-1,
        //totalElements:0,
        treeData:[],
        tablePage:new PageModel(),
        matchData:[],
        //value:JSON.stringify({
        //        refname: "用友集团",
        //        refpk: "001",  //value中指定的refpk要等于valueField对应的字段
        //}),
        showModal:false
    }
    componentDidMount() {

    }
  
    canClickGoOn = async () =>{
       
      this.setState({loading:true})
      this.loadData();
      return true;//必须要有
  }

  loadData = async () => {
    let refModelUrl = {
      tableBodyUrl: '/rest/grid-search',//表体请求
      areaTree: '/rest/getAreaTree',
    }
    let requestList = [
      request(refModelUrl.areaTree, { method: 'get' }),
      request(refModelUrl.tableBodyUrl, { method: 'Post' ,data:{}}),//,data:{uid:'001'} 
    ];
    Promise.all(requestList).then(([treeData, bodyData]) => {

      if(bodyData.data.result>0&&treeData.data.result>0){

        let tablePage=bodyData.data.data ;

        let tree=treeData.data.data ;

        let data=convertAreaTreeNode(tree);

        this.setState({tablePage:tablePage,treeData:data.children,loading:false});
      }else{

        Warning("请求出现异常，请稍后重试");
        this.setState({loading:false});
      }

    }).catch((e) => {
      
      console.log(e)
    });
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
      
      onCancel = () => {
        this.setState({ showModal: false })
      }
     
      onTreeChange = (record) => {

       // this.tableData = this.originTableData.slice(Math.floor(Math.random() * 8), -1);
       // this.setState({
       //   mustRender: Math.random()
       // })
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
        debugger;
      }
      loadTableData = (param) => {
        console.log('loadTableData', param);
        debugger;
      }

    render() {

        const {treeData,matchData,value} = this.state;

        const fliterFormInputs=[];

        const columns = [
            { title: '网格名', dataIndex: 'cellName', key: 'cellName', width: 200 },
            { title: '简称', dataIndex: 'shortName', key: 'shortName', width: 100 },
            { title: '所在地区', dataIndex: 'areaName', key: 'areaName', width: 200 },
            { title: '联系人', dataIndex: 'contactMan', key: 'contactMan', width: 100 },
            { title: '联系电话', dataIndex: 'contactPhone', key: 'contactPhone', width: 120 },
            { title: '关联帐号', dataIndex: 'linkName', key: 'linkName', width: 150 },
            { title: '备注', dataIndex: 'remarks', key: 'remarks', width: 200 }
          ];
          
          let page = {
            pageCount:  this.state.tablePage.totalPage,
            currPageIndex:  this.state.tablePage.pageIndex,
            totalElements:  this.state.tablePage.dataCount,
          };

        return (  <RefTreeTableWithInput
          {...this.props}
          //base
          title="地区网格选择"
          //menuTitle="地区"
          //tableTitle="网格列表"
          lang= "zh_CN"
          value={value}
          showLoading={this.state.loading}
          valueField={ 'id'}
          //WithInput
          canClickGoOn={this.canClickGoOn}
          placeholder='请选择地区网格'
         
          displayField={ (record) => {
            return record.cellName;
          }} 
          onSave={this.onSave}
          onCancel={this.onCancel}

          //table
          miniSearch= {true}
          multiple= {true}
          columnsData={columns}
          tableData={this.state.tablePage.data}
          page={page}
          loadTableData={this.loadTableData}
          onTableSearch={this.onTableSearch}
          matchData={matchData}

          //树
          searchable={false}
          showLine={true}
          nodeDisplay={ (record) => {
            return record.title
          }}
          treeData={this.state.treeData}
          onTreeChange={this.onTreeChange}
          onTreeSearch={this.onTreeSearch}
        />)
    }
}

export default RefGridTreeTableSelect;