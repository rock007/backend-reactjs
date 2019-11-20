import React, { useState, useEffect } from 'react';

//import {Panel, Tabs,Tile,Icon,Select, FormControl,Row, Col,Label,Form,Radio, Breadcrumb } from 'tinper-bee';

/** 
interface IProps {
    record:any
}
interface IState {

}

export default class ManItemInfo extends React.Component<IProps,IState> {
   
    componentDidMount() {

    }
    render() {
        
        return ( <div style={{padding:5}}>
            <div style={{width:'65px',float:'left'}}>
                <img id="image" width={60} height={60} src='http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-1-min.jpg' alt="Picture"/>
            </div>
            <div style={{display: 'flex',flexDirection: 'column'}}>
                <ul>
                    <li>                    
                        <span>张三</span>
                        <span>男</span>
                        <span>社区戒毒</span>
                        <span>中风险</span>
                    </li>
                    <li><span>来凤中心戒毒社区</span></li>
                    <li><span>出生年月：2019-01-01</span></li>
                </ul>
            </div>
        </div>)
    }
}
***/

/**
 * 
 * @param props 
 *   eg <ManItemInfo xxx='222' aaa="444" ></ManItemInfo>
 */

export default function ManItemInfo(props:any) {

    const [count, setCount] = useState(0);
  
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
      // Update the document title using the browser API
     //!! document.title = `You clicked ${count} times`;
    });
  
    return (
        <div style={{padding:5}}>

        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
        <div style={{width:'65px',float:'left'}}>
            <img id="image" width={60} height={60} src='http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-1-min.jpg' alt="Picture"/>
        </div>
        <div style={{display: 'flex',flexDirection: 'column'}}>
            <ul>
                <li>                    
                    <span>张三</span>
                    <span>男</span>
                    <span>社区戒毒</span>
                    <span>中风险</span>
                </li>
                <li><span>来凤中心戒毒社区</span></li>
                <li><span>出生年月：2019-01-01</span></li>
            </ul>
        </div>
    </div>
    );
  }