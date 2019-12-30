import React, {Component} from "react";
import {Select,Label} from 'tinper-bee';
import SysService from '../../services/SysService';

import './index.scss'

interface IProps {
    onChange?:(value:any)=>void,
   
}
interface IState {
    data:any[],
    childs:any[],
}

class SelectScheduleTemplate extends Component<IProps,IState> {
    
    state:IState={
        data:[],
        childs:[]
    }
    async componentDidMount() {

        let data = await SysService.getAllScheduleTemplate();

        this.setState({data:data});
    }
    handleChange = (value )=> {
      
        const find= this.state.data.find(v=>v.templateNo===value);

        if(find!=null){
            this.setState({childs:find.items});
        }
        if(this.props.onChange!=null){
            this.props.onChange(value);
        }
    }; 
    render() {
         
        return (
            <div className='select-schedule-template'>
                <Select 
                    onChange={this.handleChange}>
                    {
                        this.state.data.map((item: any, index: number) => (
                
                            <Select.Option key={item.templateNo} value={item.templateNo}>{item.name}</Select.Option>
                           
                    ))
                    }
                </Select>
                 {
                     this.state.childs.length>0?<React.Fragment>
                        <div className='items'>
                        <strong>共执行{this.state.childs.length}年</strong>
                        <ul>
                            {
                                this.state.childs.map((m,i)=> <li>{m.desc}</li>)
                            }
                        </ul>
                        </div>
                        </React.Fragment>:null
                 }   
               
            </div>
        );
    }
}

export default SelectScheduleTemplate;
