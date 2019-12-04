import * as React from 'react';
import {Panel, Button,Icon} from 'tinper-bee';
import MapView from '../../components/MapView';
import DatePicker from "bee-datepicker";

interface IPanelProps {
   manId:string,
   processId?:string
}
interface IPanelState {
    expanded:boolean,
    current:any,
    selectedkey:any
}

export default class LocationMapPanel extends React.Component<IPanelProps,IPanelState> {
    
    state:IPanelState={
        expanded:false,
        current:null,
        selectedkey:null
    }
    componentDidMount() {

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
