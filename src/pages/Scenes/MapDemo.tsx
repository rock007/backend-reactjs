import * as React from 'react';
import {Panel, PageLayout,Navbar,Icon,Select, FormControl,Row, Col,Label,Form,Radio, Breadcrumb } from 'tinper-bee';
import { Map } from 'react-amap';

const format = "YYYY";

interface ISceneProps {
    
}
interface ISceneState {
    mapCenter: {longitude:number,latitude:number},
    
}

export default class MapDemoScene extends React.Component<ISceneProps,ISceneState> {

    state:ISceneState={
        mapCenter:MapDemoScene.randomPosition()
    }
    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    changeCenter() {
        this.setState({
          mapCenter: MapDemoScene.randomPosition()
        })
    }

    static randomPosition = ():{longitude:number,latitude:number} => {
        return {
            longitude: 120 + Math.random() * 20,
            latitude: 30 + Math.random() * 10,
        };
    };

    render() {
        
        return ( <Panel>
            <div>
                <div style={{ width: "100%", height: 600 }}>
                    <Map zoom={5} center={this.state.mapCenter} amapkey={'7600ddc3efa8c045bc4ce2ed2f9b8ae5'}/>
                </div>
                <button onClick={() => { this.changeCenter() }}>Move Map To A Random Center</button>
            </div>
        </Panel >)
    }
}
