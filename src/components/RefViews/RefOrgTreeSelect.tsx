import * as React from 'react';

import {Form} from 'tinper-bee';
import { RefTreeWithInput } from 'ref-tree';
import 'ref-tree/lib/index.css';

import SysService from '../../services/SysService';
import { convertOrgTreeNode } from '../../utils/tools';

interface IOtherProps {
 
   flag?:number,
}
interface IComponentState {
    loading:boolean,
    pageCount:number,
    totalElements:number,
    treeData:any,
    matchData?:any,
    value?:string
}
type IComponentProps = IOtherProps & any;
export  class RefOrgTreeSelect extends React.Component<IComponentProps,IComponentState> {

    state:IComponentState={
        loading:false,
        pageCount:-1,
        totalElements:0,
        treeData:[],
        matchData:[],//{name:'用友集团',refname:'用友集团',code:'001'}
        value:''
        //JSON.stringify({
        //    refname: "用友集团",
        //    refpk: "001",  //value中指定的refpk要等于valueField对应的字段
        //})
    }
    componentDidMount() {

    }
    canClickGoOn = async () =>{
       
        let data = await SysService.getDetpTree(this.props.flag||0);
        let treeData=convertOrgTreeNode(data);
        
        this.setState({treeData:treeData.key!=='0'?[treeData]:treeData.children});
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
            value:`{"refname":"","refpk":"${Math.random()}"}`,
        })
    }
    render() {

        const {treeData,matchData,value} = this.state;

        return (  <RefTreeWithInput
            {...this.props}
            emptyBut={true}
            nodeDisplay={ (record) => {
                return record.title
            }}
            displayField={ (record) => {
                return record.title
            }}  //显示内容的键
            valueField={ 'key'}    //真实 value 的键
            //searchValue={'org1'}
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