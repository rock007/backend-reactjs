import * as React from 'react';
import {Tabs } from 'tinper-bee';

import LocationMapPanel from './LocationMapPanel';
import DayoffPanel from './DayoffPanel';
import ForHelpPanel from './ForHelpPanel';
import VisitPanel from './VisitPanel';
import CheckinPanel from './CheckinPanel';
import NiaojianPanel from './NiaojianPanel';
import ManRegistPanel from './ManRegistPanel';

interface IPanelProps {
	manId:string,
	processId?:string
}

interface IPanelState {
	
}

export default class ProcessInfoBussPanel extends React.Component<IPanelProps,IPanelState> {
    
    state:IPanelState={
		
    }
    componentDidMount() {

	}
	
    render() {
        
        return ( <Tabs defaultActiveKey="1">
		<Tabs.TabPane tab='社区报到' key="1">
			<ManRegistPanel/>
		</Tabs.TabPane>
		<Tabs.TabPane tab='尿检记录' key="2">
			<NiaojianPanel />
		</Tabs.TabPane>
		<Tabs.TabPane tab='走访记录' key="3">
			<VisitPanel/>
		</Tabs.TabPane>
		<Tabs.TabPane tab='签到' key="4">
			<CheckinPanel />
		</Tabs.TabPane>
		<Tabs.TabPane tab='请假' key="5">
			<DayoffPanel />
		</Tabs.TabPane>
		<Tabs.TabPane tab='求助' key="6">
			<ForHelpPanel/>
		</Tabs.TabPane>
		<Tabs.TabPane tab='位置跟踪' key="7">
			<LocationMapPanel/>
		</Tabs.TabPane>
	</Tabs>)
    }
}
