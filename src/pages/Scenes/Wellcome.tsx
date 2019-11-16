import * as React from 'react';
import {Panel, PageLayout,Navbar,Icon,Select, FormControl,Row, Col,Label,Form,Radio, Breadcrumb } from 'tinper-bee';

import Chart from '../../components/Chart';
import Editor from '../../components/Editor';

const format = "YYYY";

interface ISceneProps {
    
}
interface ISceneState {
    expanded:boolean,
    current:any,
    selectedkey:any
}

export default class WellcomeScene extends React.Component<ISceneProps,ISceneState> {
    
    state:ISceneState={
        expanded:false,
        current:null,
        selectedkey:null
    }

    componentDidMount() {

    }

    render() {
        
        return ( <Panel>
            <h3>欢迎使用系统</h3>
        </Panel >)
    }
}
