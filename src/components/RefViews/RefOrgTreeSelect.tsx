import * as React from 'react';

import { RefTreeWithInput } from 'ref-tree';
import 'ref-tree/lib/index.css';

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
}
export  class RefOrgTreeSelect extends React.Component<any,IComponentState> {

    state:IComponentState={
        loading:false,
        pageCount:-1,
        totalElements:0,
        treeData:[],
        matchData:[{name:'用友集团',refname:'用友集团',code:'001'}],
        value:JSON.stringify({
                refname: "用友集团",
                refpk: "001",  //value中指定的refpk要等于valueField对应的字段
        })
    }
    componentDidMount() {

        //let data = await SysService.getDetpTree();
        //this.setState({treeData:data.childs});
    }
    canClickGoOn = async () =>{
       
        let data = await SysService.getDetpTree();
        let treeData=convertOrgTreeNode(data);
        
        this.setState({treeData: treeData.children});
        return true;//必须要有
    }
    /**
     * @msg: 请求mock数据
     */
    loadData2 = async () => {
        this.setState({
          loading:true,
        })
        let ajax={
            // url: 'http://mock-platform-prod.online.app.yyuap.com/mock/1264/pap_basedoc/common-ref/blobRefTree',
            url: 'https://mock.yonyoucloud.com/mock/1264/pap_basedoc/common-ref/blobRefTree',
        };
        let results = await request(ajax.url,{method:'get',data:{uid:'001'}});
        let treeData = [];
        if (!results || !results.data.length){
          this.setState({ 
            loading:false,
            pageCount:-1,//不展示分页
            totalElements:0,
            treeData,
          });
          return false;
        }
        treeData = results.data;
        let page = results.page;
        this.setState({ 
          treeData,
           ...page,
           loading:false 
        });
        
    }

    onSave = (result) =>{
        this.setState({
            matchData:result,
        })
    }
    render() {

        const {treeData,matchData,value} = this.state;

        return (  <RefTreeWithInput
            emptyBut={true}
            nodeDisplay={ (record) => {
                return record.title
            }}
            displayField={ (record) => {
                return record.title
            }}  //显示内容的键
            valueField={ 'key'}    //真实 value 的键
            searchValue={'org1'}
            multiple={false}
            title="选择社区"
            showLine={true}
            onSave={this.onSave}
            matchData={matchData}
            treeData={treeData}
            canClickGoOn={this.canClickGoOn}
            selectorDisplay={'{key}-{title}'}
        >
        </RefTreeWithInput>)
    }
}

export default RefOrgTreeSelect;