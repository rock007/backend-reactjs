import * as React from 'react';
import {Icon, Timeline} from 'tinper-bee';

interface IPanelProps {
   children?: React.ReactNode
}
interface IPanelState {
    expanded:boolean,
    current:any,
    selectedkey:any
}

export default class TimelinePanel extends React.Component<IPanelProps,IPanelState> {
    
    state:IPanelState={
        expanded:false,
        current:null,
        selectedkey:null
    }
    componentDidMount() {

    }
    render() {
  
        return (<React.Fragment>
            {this.props.children} 
            <Timeline>
                <Timeline.Item>建立档案 于2015-09-01</Timeline.Item>
                <Timeline.Item>分配到中心戒毒社区 2015-09-01</Timeline.Item>
                <Timeline.Item color="danger">
                    <p>Solve initial network problems 1</p>
                    <p>Solve initial network problems 2</p>
                    <p>Solve initial network problems 3 2015-09-01</p>
                </Timeline.Item>
                <Timeline.Item dot={<Icon type="uf-time-c-o" style={{ fontSize: '16px' }} />} color="danger">Technical testing 2015-09-01</Timeline.Item>
                <Timeline.Item>社区报到 2019-01-01</Timeline.Item>
            </Timeline>
            </React.Fragment>);
    }
}
