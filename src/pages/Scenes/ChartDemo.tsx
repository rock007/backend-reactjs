import * as React from 'react';
import {Panel, PageLayout,Navbar,Icon,Select, FormControl,Row, Col,Label,Form,Radio, Breadcrumb } from 'tinper-bee';

import Chart from '../../components/Chart';

interface ISceneProps {
    
}
interface ISceneState {
    expanded:boolean,
    current:any,
    selectedkey:any
}

export default class ChartDemoScene extends React.Component<ISceneProps,ISceneState> {
    
    state:ISceneState={
        expanded:false,
        current:null,
        selectedkey:null
    }

    componentDidMount() {

    }

    render() {
        
        return ( <Panel>
            <Chart></Chart>
        </Panel >)
    }
}
