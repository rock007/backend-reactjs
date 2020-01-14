import * as React from 'react';
import {Panel} from 'tinper-bee';

import AcMultiTabs from 'ac-multi-tabs';
import 'ac-multi-tabs/dist/index.css';

import { sceneRouters } from '../../components/Router/router.config';

interface IPageProps {
    
}
interface IPageState {
    curTabName:string
}

export class Dashboard extends React.Component<IPageProps,IPageState> {
    
    state:IPageState={
        curTabName:'wellcome',
      
    }
 
    getScene=(name:string)=>{

        const one=sceneRouters.find((v,i)=>v.name==name);
        return one!=null?one.component:()=>(<div>没有找到组件</div>);
    }

    handleChange = (v,target) => {
       
        console.log(target.name);
       this.setState({curTabName:target.name});
    }

    render() {
        //const { menus } = this.state;

        const menus=[{
            id: 0,
            name: 'wellcome',
            title: "首页",
            //component:()=>{return this.getScene('wellcome')}
        },{
            id: 1,
            name: 'analysis',
            title: "社区统计",
            //component:()=>{return this.getScene('analysis')}
        }/*,{
            id: 2,
            name: 'articleDemo',
            title: "富文本测试"
        },{
            id: 3,
            name: 'chartDemo',
            title: "图表测试"
        },{
            id: 4,
            name: 'mapDemo',
            title: "地图测试"
        }**/];

        let A=this.getScene(this.state.curTabName) ;

        return ( <Panel>
          <AcMultiTabs menus={menus} onChange={this.handleChange}/>
          <Panel>
               <A/>
           </Panel>
        </Panel>)
    }
}

export default Dashboard;