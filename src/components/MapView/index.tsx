import * as React from 'react';
import {Loading } from 'tinper-bee';

import { Map ,AMapLngLat,Marker,InfoWindow,Polyline} from 'react-amap';
import { LocationModel } from '../../services/Model/Models';

interface ISceneProps {
    width?:number,
    height?:number,
    locations?:Array<LocationModel>
}
interface ISceneState {
    mapCenter: {longitude:number,latitude:number},
    path:Array<any>,
    isLoading:boolean
}

const randomPath = () => ({
    longitude: 60 + Math.random() * 50,
    latitude: 10 + Math.random() * 40,
   })

export default class MapView extends React.Component<ISceneProps,ISceneState> {

    Position:any

    static defaultProps: Partial<ISceneProps> = {
        locations:[{pointX:116.39,pointY:39.9,address:'22233sssssss中止'}],
      
    }

    state:ISceneState={
        mapCenter:{longitude:116.418261, latitude:39.921984},
        path: Array(5).fill(true).map(randomPath),
        isLoading:true
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

    markerOnClick=(e,d)=> {
        
    }

    render() {
        
        return (
                <div style={{ width: this.props.width||'100%', height: this.props.height||'100%' }}>
                    <Loading show={this.state.isLoading}
                    /> 
                    <Map zoom={10} center={this.state.mapCenter} 
                        status={{ 
                            zoomEnable: true,
                            dragEnable: true,
                        }}
                        events={{ created: (mapInstance) => {
                                    
                                    this.setState({isLoading:false});
                                    var marker = new Marker({
                                        position: {longitude: 116.39,latitude: 39.9},
                                        title: '北京!!111111111111111111111111111111111111111'
                                    });
                             
                                mapInstance.add(marker);
                            }, click: (markerInstance) => {
                                this.Position = [markerInstance.lnglat.lng,markerInstance.lnglat.lat];

                                console.log('click point:'+JSON.stringify(this.Position));
                                //this.setState({
                                //    isShow: true,
                                //});
                              
                            }}
                        }
                        plugins={['ToolBar']}
                        amapkey={'7600ddc3efa8c045bc4ce2ed2f9b8ae5'}>
                        {
                            this.props.locations.map((item) => (

                                <Marker position={[item.pointX,item.pointY]} title={item.address} 
                                    events={{'click':this.markerOnClick}}>
                                </Marker>
                            ))
                        }
                          <InfoWindow
                                position={this.state.mapCenter}
                                visible={true}
                                content={'html'+3333333333333333333333333333333333333333}
                                size={ {width: 200,
                                    height: 140}}
                            />
                            <Polyline 
                                path={ this.state.path }
                                visible={ true }
                            />
                        </Map>
                </div>
            )
    }
}