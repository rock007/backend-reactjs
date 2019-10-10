import * as React from 'react';

import AcMultiTabs from 'ac-multi-tabs';
import 'ac-multi-tabs/dist/index.css';

interface IPageProps {
    
}
interface IPageState {
 
    menus: any[]

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

    handleChange = (v) => {
        console.log(v)
        this.setState({
            menus : v
        })
    }
    render() {
        const { menus } = this.state;
        return (  <div>
            <AcMultiTabs menus={menus} onChange={this.handleChange}/>
            </div>)
    }
}

export default Dashboard;