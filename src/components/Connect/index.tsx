import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import AppConsts from '../../lib/appconst';
import { Info } from '../../utils';

interface IOtherProps {
  
}
interface IOtherState {
  isConnect:boolean
}

export default class ConnectPanel extends React.Component<IOtherProps,IOtherState> {

  static socket:any
  timer:any

  state:IOtherState={
    isConnect:false
  }
  componentDidMount() {
    //this.init();
  }

  componentWillUnmount() {
    if(this.timer!=null) clearTimeout(this.timer);
   };

  init=()=> {
     let me=this;
/** 
    ConnectPanel.socket = io.connect(AppConsts.remoteServiceBaseUrl, {
      path: '/connect',
      upgrade:true
    });
**/
    ConnectPanel.socket = io.connect(AppConsts.websocketUrl);
    ConnectPanel.socket.on('connect', function(){
        console.log("连接成功");
        me.setState({isConnect:true});
        ConnectPanel.socket.emit('im.login', {from: AppConsts.session.userId, msgType: 'Login',to:''}); 
    });
    ConnectPanel.socket.on('receive', this.onMessageReceived);
  
    ConnectPanel.socket.on('disconnect', function(){
      
        console.log("连接断开");
        me.setState({isConnect:false});
        this.timer= setTimeout(function(){
          me.init();
       }.bind(this),30000);
    });

}

onMessageReceived=(msg)=> {

  console.log("received:" + JSON.stringify(msg));

  if (msg.msgType == 'Notify') {
      
      var html = msg.content;

      if (html.length != 0) {
        Info(html);
      }

      if (msg.extra != null&&msg.extra!='' ) {

          var map= JSON.parse( msg.extra);

          if(map.unReadNum!=null){

              var num = map.unReadNum;

              if (num > 0) {
                //$('#textNum').text(num);
              } else {
                //$('#textNum').text("");
              }
          }
      }
  }
}

render() {
 
    return (
        <small>{this.state.isConnect?"已连接":"未连接"}</small>
    );
  }
}

