import * as React from 'react';

import { Radio} from 'tinper-bee';

import { RefTreeTableWithInput } from 'ref-tree-table'
import 'ref-tree-table/lib/index.css';

import request from '../../utils/request';
import SysService from '../../services/SysService';
import { convertOrgTreeNode } from '../../utils/tools';

interface IComponentProps {
   // form:any
}
interface IComponentState {
    loading:boolean,
    pageCount:number,
    totalElements:number,
    treeData:any,
    matchData?:any,
    value?:string
    showModal:boolean
}
export  class RefGridTreeTableSelect extends React.Component<IComponentProps,IComponentState> {

    state:IComponentState={
        loading:false,
        pageCount:-1,
        totalElements:0,
        treeData:[],
        matchData:[{name:'用友集团',refname:'用友集团',code:'001'}],
        value:JSON.stringify({
                refname: "用友集团",
                refpk: "001",  //value中指定的refpk要等于valueField对应的字段
        }),
        showModal:false
    }
    componentDidMount() {

        //let data = await SysService.getDetpTree();
        //this.setState({treeData:data.childs});
        //this.loadData()
    }
  
    canClickGoOn = async () =>{
       
      let data = await SysService.getDetpTree();
      let treeData=convertOrgTreeNode(data);
      
      this.setState({treeData: treeData.children});
      return true;//必须要有
  }

  loadData = async () => {
    let refModelUrl = {
      tableBodyUrl: 'https://mock.yonyoucloud.com/mock/1264/pap_basedoc/common-ref/blobRefTreeGrid',//表体请求
      refInfo: 'https://mock.yonyoucloud.com/mock/1264/pap_basedoc/common-ref/refInfo',//表头请求
    }
    let requestList = [
      request(refModelUrl.refInfo, { method: 'get' }),//表头数据
      request(refModelUrl.tableBodyUrl, { method: 'get' }), //表体数据
    ];
    Promise.all(requestList).then(([columnsData, bodyData]) => {

      /** 
      this.launchTableHeader(columnsData);
      this.launchTableData(bodyData);
      this.setState({
        showLoading: false
      });
      ***/
    }).catch((e) => {
      ;

      console.log(e)
    });;
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
      }
      loadTableData = (param) => {
        console.log('loadTableData', param)
      }

    render() {

        const {treeData,matchData,value} = this.state;

        const fliterFormInputs=[];

        const columns = [
            {
                title: " ",
                dataIndex: "a1",
                key: "a1",
                width: 45,
                render(text, record, index) {

                  return (
                    <Radio.RadioGroup
                      name={record.key}
                      selectedValue={record._checked ? record.key : null}
                    >
                      <Radio value={record.title}></Radio>
                    </Radio.RadioGroup>
                  )
                }
            },
            { title: '用户名', dataIndex: 'a', key: 'a', width: 100 },
            { title: '性别', dataIndex: 'b', key: 'b', width: 100 },
            { title: '年龄', dataIndex: 'c', key: 'c', width: 200 },
            {
              title: '操作', dataIndex: '', key: 'd', render() {
                return <a href="#">一些操作</a>;
              },
            },
          ];
          
          const data = [
            { a: '令狐冲', b: '男', c: 41, key: '1' },
            { a: '杨过', b: '男', c: 67, key: '2' },
            { a: '郭靖', b: '男', c: 25, key: '3' },
          ];

          let options = {
            displayField: '{refname}',
            valueField: 'refpk',
            lang: 'zh_CN',
            miniSearch: true,
            multiple: true,
          }

          let page = {
            pageCount:  1,
            currPageIndex:  1,
            totalElements:  3,
          };

        return (  <RefTreeTableWithInput
          
          title="地区网格选择"
          lang= "zh_CN"
          miniSearch= {true}
          multiple= {true}

          nodeDisplay={ (record) => {
            return record.title
        }}
        displayField={ (record) => {
            return record.title
        }}  //显示内容的键
        valueField={ 'key'} 
          showLine={true}
          treeData={this.state.treeData}
          columnsData={columns}
          tableData={data}
          page={page}
          matchData={matchData}
          value={value}
          
          canClickGoOn={this.canClickGoOn}

          searchable={false}
          onTreeChange={this.onTreeChange}
          onTreeSearch={this.onTreeSearch}
          onTableSearch={this.onTableSearch}
          onSave={this.onSave}
          onCancel={this.onCancel}
          //loadTableData={this.loadTableData}

        />)
    }
}

export default RefGridTreeTableSelect;