import * as React from 'react';
import {Panel} from 'tinper-bee';
import { Map } from 'react-amap';

interface ISceneProps {
    width?:number,
    height?:number
}
interface ISceneState {
    mapCenter: {longitude:number,latitude:number},
    
}

export default class MapView extends React.Component<ISceneProps,ISceneState> {

    state:ISceneState={
        mapCenter:MapView.randomPosition()
    }
    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    changeCenter() {
        this.setState({
          mapCenter: MapView.randomPosition()
        })
    }

    static randomPosition = ():{longitude:number,latitude:number} => {
        return {
            longitude: 120 + Math.random() * 20,
            latitude: 30 + Math.random() * 10,
        };
    };

    render() {
        
        return (
                <div style={{ width: this.props.width||'100%', height: this.props.height||'100%' }}>
                    <Map zoom={5} center={this.state.mapCenter} amapkey={'7600ddc3efa8c045bc4ce2ed2f9b8ae5'}/>
                </div>
            )
    }
}
