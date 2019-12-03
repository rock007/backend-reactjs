import * as React from 'react';
import {Panel,Tag} from 'tinper-bee';

import Calendar from 'bee-calendar';
import 'bee-calendar/build/Calendar.css';
import zhCN from "rc-calendar/lib/locale/zh_CN";

import ManService from '../../services/ManService';
import {PageModel,IPageCommProps,IListPageState,PopPageModel} from '../../services/Model/Models';

interface IOtherProps {
    
} 

interface IOtherState {
  page:PageModel<any>,
  isLoading:boolean,
  type:string
}

type IPanelProps = IOtherProps ;
type IPanelState = IOtherState ;


export default class CheckinPanel extends React.Component<IPanelProps,IPanelState> {
    
    pageIndex=1
    pageSize=10

    state:IPanelState={
      page:new PageModel<any>(),
      isLoading:false,
      type:'date'
    }
    componentDidMount() {

      this.loadData({});
    }
    loadData=async (args:any)=>{
        
      //args['orderby']=this.orderBy;
      let page = await ManService.searchDayoff(args,this.pageIndex,this.pageSize) as PageModel<any>;
      this.setState({page:page,isLoading:false});
    }
    onTypeChange(type) {
      this.setState({
          type,
      });
    }
    render() {
        
        return (<div>
             <Calendar
	   			style={{ margin: 10 }}
	   			fullscreen={true}
	   			locale={zhCN}
	   			onSelect={()=>{}}
	   			type={this.state.type}
	   			onTypeChange={this.onTypeChange.bind(this)}
	   			//dateCellContentRender={(v)=>{	return <span>{v.format('YYYY-MM-DD')}</span>}}

   			/>
            </div>);
    }
}
