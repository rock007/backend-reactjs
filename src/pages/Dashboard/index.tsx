import * as React from 'react';
import LoadableComponent from '../../components/Loadable/index';
import {Panel,Tabs , PageLayout,Navbar,Icon,Select, FormControl,Row, Col,Label,Form,Radio, Breadcrumb } from 'tinper-bee';

import utils from '../../utils/utils';

import AcMultiTabs from 'ac-multi-tabs';
import 'ac-multi-tabs/dist/index.css';

import Login from '../Account/index'

interface IPageProps {
    
}
interface IPageState {
 
    menus: any[],
    curPanel?:any

}

export class Dashboard extends React.Component<IPageProps,IPageState> {
    
    state:IPageState={
        
        menus:[{
            id: 0,
            router: '/account',
            title: "首页"
        },{
            id: 1,
            router: '/visitor',
            title: "走访查询"
        },{
            id: 2,
            router: '/niaojian',
            title: "尿检记录"
        },{
            id: 3,
            router: '/niaojian',
            title: "尿检记录44"
        }]

    }
    componentDidMount() {

    }

    handleChange = (v,target) => {
       
        console.log(target)
        
       var mm= utils.getRoute(target.router);

       //let component= LoadableComponent(() => import('../Account/index'))

       this.setState({curPanel:mm.component});
    }
    onChange = (activeKey) => {
        console.log(`onChange ${activeKey} o-^-o`);
       
    }
    render() {
        const { menus } = this.state;

        let component= LoadableComponent(() => import('../Account/index')) ;

        return ( <Panel>
          <AcMultiTabs menus={menus} onChange={this.handleChange}/>
            <Panel>

                {React.createElement(this.state.curPanel||component) }
            </Panel>
            </Panel>)
    }
}

export default Dashboard;