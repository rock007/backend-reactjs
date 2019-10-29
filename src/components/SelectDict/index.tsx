import React, {Component} from "react";
import {Select} from 'tinper-bee';
import SysService from '../../services/SysService';

import './index.scss'

interface IProps {
    onChange:(value:any)=>void,
    type:number
}
interface IState {
    data:any[]
}

class SelectDict extends Component<IProps,IState> {
    
    state:IState={
        data:[]
    }
    constructor(props) {
        super(props);
    }
    async componentDidMount() {

        let data = await SysService.getDict(this.props.type);

        this.setState({data:data});
    }
    render() {
     
        return (
            <React.Fragment>
                <Select>
                    {
                        this.state.data.map((item: any, index: number) => (
                
                            <Select.Option key={this.props.type+'_'+item.key} value={item.key}>{item.text}</Select.Option>
                           
                    ))
                    }
                    
                </Select>
            </React.Fragment>
        );
    }
}

export default SelectDict;
