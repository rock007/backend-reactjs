import * as React from 'react';

import {Form} from 'tinper-bee';
import { RefTreeWithInput } from 'ref-tree';
import 'ref-tree/lib/index.css';

import SysService from '../../services/SysService';
import { convertAreaTreeNode } from '../../utils/tools';

interface IComponentProps {
    
   
}
interface IComponentState {
    loading:boolean,
    pageCount:number,
    totalElements:number,
    treeData:any,
    matchData?:any,
    value?:string
}
export  class RefAreaTreeSelect extends React.Component<any,IComponentState> {

    state:IComponentState={
        loading:false,
        pageCount:-1,
        totalElements:0,
        treeData:[],
        matchData:[],
        value:''
    }
    componentDidMount() {

    }
    canClickGoOn = async () =>{
       
        let data = await SysService.getAreaTree();
        let treeData=convertAreaTreeNode(data);
        
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
            title="选择地区"
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

export default RefAreaTreeSelect;