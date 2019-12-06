import * as React from 'react';
import {Panel, Button,Icon} from 'tinper-bee';
import MapView from '../../components/MapView';
import DatePicker from "bee-datepicker";
import ManService from '../../services/ManService';
import { PageModel } from '../../services/Model/Models';

  interface IOtherProps {
    manId:string,
    processId?:string
  } 
  
  interface IOtherState {
    data:Array<any>,
    isLoading:boolean,
  }
  
  type IPanelProps = IOtherProps ;
  type IPanelState = IOtherState ;

export default class LocationMapPanel extends React.Component<IPanelProps,IPanelState> {
    
    pageIndex=1
    pageSize=30

    state:IPanelState={
        data:[],
        isLoading:false
    }
    componentDidMount() {
        let args={manId:this.props.manId,processId:this.props.processId};
        this.loadData(args);
    }
    loadData=async (args:any)=>{

        //args['orderby']=this.orderBy;
        let page = await ManService.searchLocation(args,this.pageIndex,this.pageSize) as PageModel<any>;
        this.setState({data:page.data,isLoading:false});
    }
    render() {
        
        return (<div>

          <div style={{padding:'5px',backgroundColor:"lightgray"}}>
          <ul style={{display:'flex'}}>
              
              <li>
                  <DatePicker.RangePicker                             
                          placeholder={'开始 ~ 结束'}
                          dateInputPlaceholder={['开始', '结束']}
                          showClear={true}
                          showClose={true}
                  />
              </li>
              <li><Button colors="info"><Icon type='uf-search' />查询</Button></li>
          </ul>
          </div>
          <MapView width={600} height={400}/>
      </div>);
    }
}
