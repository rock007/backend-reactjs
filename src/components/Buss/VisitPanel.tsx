import * as React from 'react';
import {Panel,Tag} from 'tinper-bee';

import ManService from '../../services/ManService';
import DataGrid from '../../components/DataGrid';
import {PageModel,IPageCommProps,IListPageState,PopPageModel} from '../../services/Model/Models';
import { threadId } from 'worker_threads';

interface IOtherProps {
  manId:string,
	processId?:string
} 

interface IOtherState {
  page:PageModel<any>,
  isLoading:boolean,
}

type IPanelProps = IOtherProps ;
type IPanelState = IOtherState ;

export default class VisitPanel extends React.Component<IPanelProps,IPanelState> {
    
    pageIndex=1
    pageSize=10

    state:IPanelState={
      page:new PageModel<any>(),
      isLoading:false,

    }
    componentDidMount() {

      this.loadData();
    }
    loadData=async ()=>{
      
      let args={toUid:this.props.manId,processId:this.props.processId};
      let page = await ManService.searchVisit(args,this.pageIndex,this.pageSize) as PageModel<any>;
      this.setState({page:page,isLoading:false});
    }

    onPageChange=(pageIndex:number,pageSize:number,orderBy:Array<any>)=>{

      this.pageIndex=pageIndex;
      this.pageSize=pageSize;
     
      this.loadData();
    }
    render() {
        
      const columns = [
        { title: '被走访人', dataIndex: 'toVisitor', key: 'toVisitor',textAlign:'center', width: 160 },
        { title: '关系', dataIndex: 'toVisitorRelationship', key: 'toVisitorRelationship',textAlign:'center', width: 100 },
        { title: '走访地点', dataIndex: 'address', key: 'address',textAlign:'center', width: 150 },
        { title: '结果', dataIndex: 'result', key: 'result',textAlign:'center', width: 120 ,sorter: (pre, after) => {return pre.c - after.c}},
     
        { title: '走访时间 ', dataIndex: 'visitorDate', key: 'visitorDate',textAlign:'center', width: 150,sorter: (pre, after) => {return pre.c - after.c} },
        { title: '走访人', dataIndex: 'visitorName', key: 'visitorName',textAlign:'center', width: 100 },
        
        { title: '创建时间 ', dataIndex: 'createDate', key: 'createDate',textAlign:'center', width: 150 },
        
      ];
 
        return (<div>
             <DataGrid
             multiSelect={{type:"none"}}
             isLoading={this.state.isLoading}
             columns={columns}
             page={this.state.page}
             pageChange={this.onPageChange}
             
         />
            </div>);
    }
}
