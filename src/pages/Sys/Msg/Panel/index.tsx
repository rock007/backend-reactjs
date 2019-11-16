import * as React from 'react';

import 'ac-multi-tabs/dist/index.css';

import { Panel,Navbar ,SearchPanel, FormControl,Row, Col,Label,Form,Radio,Menu  } from 'tinper-bee';

import './index.scss';

interface IPanelProps {
    unReadNum:number
}
interface IPanelState {
    records: Array<any>
}
export  class MsgPanel extends React.Component<IPanelProps,IPanelState> {

    state:IPanelState={
        records:[]
    }
    componentDidMount() {

    }
    render() {

        return (  <React.Fragment>
                    <Panel header="Panel 1" eventKey="1">Panel 1 content</Panel>
                    <Panel header="Panel 2" eventKey="2">Panel 2 content</Panel>
            </React.Fragment>)
    }
}

export default MsgPanel;