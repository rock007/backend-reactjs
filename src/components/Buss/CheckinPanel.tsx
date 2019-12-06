import * as React from 'react';
import {Panel,Tag} from 'tinper-bee';

import Calendar from 'bee-calendar';
import 'bee-calendar/build/Calendar.css';
import zhCN from "rc-calendar/lib/locale/zh_CN";
import moment from 'moment';

import ManService from '../../services/ManService';
import {PageModel} from '../../services/Model/Models';

interface IOtherProps {
  manId:string,
	processId?:string
} 

interface IOtherState {
  data:Array<any>,
  isLoading:boolean,
  type:string
}

type IPanelProps = IOtherProps ;
type IPanelState = IOtherState ;

export default class CheckinPanel extends React.Component<IPanelProps,IPanelState> {
    
    pageIndex=1
    pageSize=31

    state:IPanelState={
      data:[],
      isLoading:false,
      type:'date'
    }
    componentDidMount() {

      let args={manId:this.props.manId,processId:this.props.processId};
      this.loadData(args);
    }

    loadData=async (args:any)=>{

      //args['orderby']=this.orderBy;
      let page = await ManService.searchCheckin(args,this.pageIndex,this.pageSize) as PageModel<any>;
      this.setState({data:page.data,isLoading:false});
    }
    onTypeChange(type) {
      this.setState({
          type,
      });
    }
    onDateSelect=(e)=>{

    }

    render() {
        
        return (<div>
             <Calendar
	   			style={{ margin: 10 }}
	   			fullscreen={true}
	   			locale={zhCN}
	   			onSelect={this.onDateSelect}
	   			type={this.state.type}
	   			onTypeChange={this.onTypeChange.bind(this)}
	   			dateCellContentRender={(v)=>{	return <CellItem  data={this.state.data} value={v.format('YYYY-MM-DD')}></CellItem>}}

   			/>
            </div>);
    }
}


  
export  function CellItem(props:any) {
  
  let findOne=props.data.find((item,index)=>item.inDay===props.value);
 
  let now= moment(new Date(),'YYYY-MM-DD')
  let isOverToday= moment(props.value).isBefore(now);

  return (

      <div style={{padding:3}}>
    <span>{props.value}</span>
    {
      isOverToday?
      findOne==null?<Tag colors="danger">未签到</Tag>:<Tag colors="info">已签到</Tag>
      :null
    }

  </div>
  );
}