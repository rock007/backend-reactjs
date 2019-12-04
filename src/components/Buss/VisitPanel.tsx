import * as React from 'react';
import {Panel,Tag} from 'tinper-bee';

import ManService from '../../services/ManService';
import Grid from '../../components/Grid';
import {PageModel,IPageCommProps,IListPageState,PopPageModel} from '../../services/Model/Models';

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

      this.loadData({});
    }
    loadData=async (args:any)=>{
        
      let page = await ManService.searchVisit(args,this.pageIndex,this.pageSize) as PageModel<any>;
      this.setState({page:page,isLoading:false});
    }

    onPageChange=(pageIndex:number,pageSize:number,orderBy:Array<any>)=>{

      this.pageIndex=pageIndex;
      this.pageSize=pageSize;
      //this.orderBy=orderBy;
      //this.search();
    }
    render() {
        
      const columns = [
        { title: '姓名', dataIndex: 'realName', key: 'realName',textAlign:'center', width: 100  },
        { title: '性别', dataIndex: 'sex', key: 'sex', textAlign:'center',width: 80 },
        { title: '联系方式', dataIndex: 'linkPhone', key: 'linkPhone',textAlign:'center', width: 120 ,
            
        },
       
        { title: '被走访人', dataIndex: 'toVisitor', key: 'toVisitor',textAlign:'center', width: 160 },
        { title: '关系', dataIndex: 'toVisitorRelationship', key: 'toVisitorRelationship',textAlign:'center', width: 100 },
        { title: '走访地点', dataIndex: 'address', key: 'address',textAlign:'center', width: 150 },
        { title: '结果', dataIndex: 'result', key: 'result',textAlign:'center', width: 120 ,sorter: (pre, after) => {return pre.c - after.c}},
     
        { title: '走访时间 ', dataIndex: 'visitorDate', key: 'visitorDate',textAlign:'center', width: 150,sorter: (pre, after) => {return pre.c - after.c} },
        { title: '走访人', dataIndex: 'visitorName', key: 'visitorName',textAlign:'center', width: 100 },
        
        { title: '创建时间 ', dataIndex: 'createDate', key: 'createDate',textAlign:'center', width: 150 },
        { title: '身份证号', dataIndex: 'idsNo', key: 'idsNo',textAlign:'center', width: 180 ,
           
        },
        { title: '出生年月', dataIndex: 'birthday', key: 'birthday',textAlign:'center', width: 160 },
        { title: '社区', dataIndex: 'orgName', key: 'orgName',textAlign:'center', width: 200 ,
           
        },
      ];
 
        return (<div>
             <Grid
             multiSelect={{type:"none"}}
             isLoading={this.state.isLoading}
             columns={columns}
             page={this.state.page}
             pageChange={this.onPageChange}
             
         />
            </div>);
    }
}
