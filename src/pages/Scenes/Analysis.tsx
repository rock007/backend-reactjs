import * as React from 'react';
import {Panel,Loading,Tag,Checkbox,Radio,Form,Label,Tile} from 'tinper-bee';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';

import SearchPanel from '../../components/SearchPanel';
import {FormList ,FormListItem}from '../../components/FormList';

import ManService from '../../services/ManService';
import BussService from '../../services/BussService';
import { PageModel } from '../../services/Model/Models';
import { getWidth, getHeight } from '../../utils/tools';
import RefOrgTreeSelect from '../../components/RefViews/RefOrgTreeSelect';

const FormItem = FormListItem;
interface ISceneProps {
    
}
interface ISceneState {

    isLoading:boolean
}

export default  class AnalysisScene extends React.Component<ISceneProps,ISceneState> {
    
    pageIndex=1
    pageSize=5
    orderBy=[]

    state:ISceneState={
        isLoading:false
    }

    componentDidMount() {
        //this.loadData();
    }

    loadData=async ()=>{

        this.setState({isLoading:true});
    }
    
    clear=()=>{
       // this.props.form.resetFields()
    }
    search=()=>{

    }
    render() {

       // const { getFieldProps, getFieldError } = this.props.form;
        
        const data = [
            {
              name: '社区 A', uv: 4000, pv: 2400, amt: 2400,
            },
            {
              name: '社区 B', uv: 3000, pv: 1398, amt: 2210,
            },
            {
              name: '社区 C', uv: 2000, pv: 9800, amt: 2290,
            },
            {
              name: '社区 D', uv: 2780, pv: 3908, amt: 2000,
            },
            {
              name: '社区 E', uv: 1890, pv: 4800, amt: 2181,
            },
            {
              name: '社区 F', uv: 2390, pv: 3800, amt: 2500,
            },
            {
              name: '社区 G', uv: 3490, pv: 4300, amt: 2100,
            },
          ];

          const optionsWithDisabled = [
            { label: '尿检', value: 'Apple' },
            { label: '走访', value: 'Pear' },
            { label: '请假', value: 'dayoff'},
            { label: '求助', value: 'help'},
            { label: '见面', value: 'meet'},
            { label: '签到', value: 'checkin'},
          ];

        return ( <div>
            <Loading container={this} show={this.state.isLoading}/>

            <Panel header="数据统计" >
                <Label>风险等级</Label>
                <div style={{display:'flex',flexWrap:'wrap'}}>
                <Tile style={{width:150}}>
				    <h4>低风险</h4>
				    <h2>195</h2>
			    </Tile>
                <Tile style={{width:150}}>
				    <h4>中风险</h4>
				    <h2>2000</h2>
			    </Tile>
                <Tile style={{width:150}}>
				    <h4>高风险</h4>
				    <h2>3000</h2>
			    </Tile>
                </div>
                <Label>预警红黄牌</Label>
                <div style={{display:'flex',flexWrap:'wrap'}}>
                <Tile style={{width:150}}>
				    <h4>预警</h4>
				    <h2>195</h2>
			    </Tile>
                <Tile style={{width:150}}>
				    <h4>黄牌</h4>
				    <h2>2000</h2>
			    </Tile>
                <Tile style={{width:150}}>
				    <h4>红牌</h4>
				    <h2>3000</h2>
			    </Tile>
                </div>
                <Label>人员统计</Label>
                <div style={{display:'flex',flexWrap:'wrap'}}> 
                <Tile style={{width:150}}>
				    <h4>总人数</h4>
				    <h2>1000</h2>
			    </Tile>
                <Tile style={{width:150}}>
				    <h4>强戒人员</h4>
				    <h2>1000</h2>
			    </Tile>
                <Tile style={{width:150}}>
				    <h4>社会面管控</h4>
				    <h2>2000</h2>
			    </Tile>
                <Tile style={{width:150}}>
				    <h4>服刑人员</h4>
				    <h2>95</h2>
			    </Tile>
                <Tile style={{width:150}}>
				    <h4>未分类</h4>
				    <h2>5</h2>
			    </Tile>
                </div>
            </Panel>
           <Panel header="下级社区业务对比">
            <SearchPanel
                reset={this.clear}
                onCallback={()=>{}}
                search={this.search}
                searchOpen={true}>
                <FormList size="sm">
                    <FormItem
                        label="社区">
                        <RefOrgTreeSelect />
                    </FormItem>
                    <FormItem
                        label="类型">
                        <Radio.RadioGroup
                            name="act"
                            defaultValue="3"
                            //onChange={this.handleChange}
                        >
                            <Radio value="1">风险等级</Radio>
                            <Radio value="2">预警红黄牌</Radio>
                            <Radio value="3">业务</Radio>
                        </Radio.RadioGroup>
                    </FormItem>  
                    <FormItem
                        label="业务">
                        <Checkbox.CheckboxGroup
				            options={optionsWithDisabled}
				            defaultValue={['Apple','Pear']}
				        />
                    </FormItem>
                </FormList>
                </SearchPanel>
                <BarChart
                        width={getWidth()-200}
                        height={getHeight()}
                        data={data}
                        margin={{
                          top: 5, right: 30, left: 20, bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" name="尿检(人次)" fill="#8884d8" />
                        <Bar dataKey="uv" name="走访(人次)" fill="#82ca9d" />
                </BarChart>
           </Panel>
        </div>)
    }
}
