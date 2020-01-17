import * as React from 'react';
import {Panel, Button,Icon} from 'tinper-bee';
import MapView from '../../components/MapView';
import DatePicker from "bee-datepicker";

import ManService from '../../services/ManService';
import { PageModel } from '../../services/Model/Models';
import { Info } from '../../utils';

  interface IOtherProps {
    manId:string,
    processId?:string
  } 
  
  interface IOtherState {
    data:Array<any>,
    isLoading:boolean,
    dateRange?:string[],
  }
  
  type IPanelProps = IOtherProps ;
  type IPanelState = IOtherState ;

export default class LocationMapPanel extends React.Component<IPanelProps,IPanelState> {
    
    pageIndex=1
    pageSize=30

    state:IPanelState={
        data:[],
        isLoading:false,
        
    }
    componentDidMount() {
      this.handler_search();
    }
    loadData=async (args:any)=>{

        //args['orderby']=this.orderBy;
        let page = await ManService.searchLocation(args,this.pageIndex,this.pageSize) as PageModel<any>;
        this.setState({data:page.data,isLoading:false});

        if(page.data.length==0){
          Info("暂无记录");
        }
    }

    handler_search=()=>{

      var args={
          manId:this.props.manId,
          processId:this.props.processId,
          createDate:this.state.dateRange==null||this.state.dateRange.length==0?"":this.state.dateRange[0]+'~'+this.state.dateRange[1]
      };
      this.loadData(args);
  }

  onDatePickerChange = (dates:any[],dateStr1:string,dateStr2:string[] )  => {

    this.setState({dateRange:dateStr2})
  }

  render() {
        
        return (<div>

          <div style={{padding:'5px',backgroundColor:"lightgray"}}>
          <ul style={{display:'flex'}}>
              
              <li>
                  <DatePicker.RangePicker                             
                          placeholder={'开始 ~ 结束'}
                          dateInputPlaceholder={['开始', '结束']}
                          onChange={this.onDatePickerChange}
                          showClear={true}
                          showClose={true}
                  />
              </li>
              <li><Button colors="info" onClick={this.handler_search}><Icon type='uf-search' />查询</Button></li>
          </ul>
          </div>
          <MapView  locations={this.state.data} width={600} height={400}/>
      </div>);
    }
}
