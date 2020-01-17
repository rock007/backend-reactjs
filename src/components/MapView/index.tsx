import * as React from 'react';
import {Loading } from 'tinper-bee';

import { Map ,AMapLngLat,Marker,InfoWindow,Polyline} from 'react-amap';
import { LocationModel } from '../../services/Model/Models';
import { Info } from '../../utils';

interface ISceneProps {
    width?:number,
    height?:number,
    locations:Array<LocationModel>
}
interface ISceneState {
    mapCenter: {longitude:number,latitude:number},
    path:Array<any>,
    isLoading:boolean,
    windowPop?:IwindowPop,
    isShowPop:boolean
}

interface IwindowPop{
    position:any,
    content:string
}

const randomPath = () => ({
    longitude: 60 + Math.random() * 50,
    latitude: 10 + Math.random() * 40,
   })

export default class MapView extends React.Component<ISceneProps,ISceneState> {

    Position:any

    static defaultProps: Partial<ISceneProps> = {
        //locations:[{locationX:116.39,locationY:39.9,location:'22233sssssss中止'}],
      
    }

    state:ISceneState={
        mapCenter:{longitude:116.418261, latitude:39.921984},
        path: Array(5).fill(true).map(randomPath),
        isLoading:true,
        isShowPop:false
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

    markerOnClick=(item,e)=> {
  
        this.setState({windowPop:{
                content:'地点：'+item.location+' 时间:'+item.createDate,
                position: {longitude:item.locationX, latitude:item.locationY}
            },
            isShowPop:true
        });
    }

    render() {
        
        const mapCenter=this.props.locations&&this.props.locations.length==0 ?{longitude:116.418261, latitude:39.921984}:{longitude:this.props.locations[0].locationX, latitude:this.props.locations[0].locationY};

        return (
                <div style={{ width: this.props.width||'100%', height: this.props.height||'100%' }}>
                    <Loading show={this.state.isLoading} container={this} /> 
                    <Map zoom={10} center={mapCenter} 
                        status={{ 
                            zoomEnable: true,
                            dragEnable: true,
                        }}
                        events={{ created: (mapInstance) => {
                                    
                                    this.setState({isLoading:false});
                                    /** 
                                    var marker = new Marker({
                                        position: {longitude: 116.39,latitude: 39.9},
                                        title: '北京!!111111111111111111111111111111111111111'
                                    });
                             
                                mapInstance.add(marker);
                                ***/

                            },/**  click: (markerInstance) => {
                                this.Position = [markerInstance.lnglat.lng,markerInstance.lnglat.lat];

                                console.log('click point:'+JSON.stringify(this.Position));
                                //this.setState({
                                //    isShow: true,
                                //});
                              
                            }***/
                            }
                        }
                        plugins={['ToolBar']}
                        amapkey={'7600ddc3efa8c045bc4ce2ed2f9b8ae5'}>
                        {
                            this.props.locations.map((item) => (

                                <Marker position={[item.locationX,item.locationY]} title={item.location+' '+item.createDate} 
                                    events={{'click':this.markerOnClick.bind(this,item)}}>
                                        
                                </Marker>
                            ))
                        }
                        {
                            this.state.windowPop?
                            <InfoWindow
                                position={this.state.windowPop.position}
                                visible={this.state.isShowPop}
                                isCustom={false}
                                content={this.state.windowPop.content}
                                size={ {width: 200, height: 140}}
                                events={{
                                    close:()=>{
                                        this.setState({isShowPop:false});
                                    }
                                }}
                            />:null
                        }
                       
                        </Map>
                </div>
            )
/** 
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

         <Polyline 
                            path={ this.props.locations.map((m,i)=>{
                                return {
                                    longitude: m.locationX,
                                    latitude: m.locationY,
                                   }
                            }) }
                            visible={ true }
                        />
                        
        ***/
    }
}