import * as React from 'react';
import {Panel,Tag} from 'tinper-bee';

import ManService from '../../services/ManService';
import DataGrid from '../../components/DataGrid';
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


export default class ForHelpPanel extends React.Component<IPanelProps,IPanelState> {
    
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
        
      //args['orderby']=this.orderBy;
      let page = await ManService.search4Help(args,this.pageIndex,this.pageSize) as PageModel<any>;
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
        { title: '姓名', dataIndex: 'realName', key: 'realName',textAlign:'center', width: 100 
        },
        { title: '性别', dataIndex: 'sex', key: 'sex', textAlign:'center',width: 80 },
        { title: '联系方式', dataIndex: 'linkPhone', key: 'linkPhone',textAlign:'center', width: 120 ,
          
        },

        { title: '求助类别', dataIndex: 'helpType', key: 'helpType', textAlign:'center',width: 80 },
        { title: '内容', dataIndex: 'content', key: 'content', textAlign:'center',width: 80 },
        { title: '创建时间', dataIndex: 'createDate', key: 'createDate', textAlign:'center',width: 80 , sorter: (pre, after) => {return pre.c - after.c}},
        { title: '状态', dataIndex: 'status', key: 'status', textAlign:'center',width: 100 ,
            render(text,record,index) {

            return text==0?<Tag colors="warning">未回复</Tag>:(text==1?<Tag colors="success">已回复</Tag>:<Tag colors="warning">未知状态</Tag>);

            }
           
        },
        { title: '回复', dataIndex: 'respContent', key: 'respContent', textAlign:'center',width: 120 },
        { title: '回复人', dataIndex: 'respUser', key: 'respUser', textAlign:'center',width: 100 },
        { title: '回复时间', dataIndex: 'respDate', key: 'respDate', textAlign:'center',width: 120,sorter: (pre, after) => {return pre.c - after.c}},

        { title: '身份证号', dataIndex: 'idsNo', key: 'idsNo',textAlign:'center', width: 180 },
        { title: '出生年月', dataIndex: 'birthday', key: 'birthday',textAlign:'center', width: 160 },
        { title: '社区', dataIndex: 'orgName', key: 'orgName',textAlign:'center', width: 200 ,
            
        }
      ];
 
        return (<div>
             <DataGrid
             isLoading={this.state.isLoading}
             multiSelect={{type:"none"}}
             columns={columns}
             page={this.state.page}
             pageChange={this.onPageChange}
             
         />
            </div>);
    }
}
