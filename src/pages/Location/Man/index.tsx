import * as React from 'react';
import {Panel,  Form,Label,Button,Icon,Loading} from 'tinper-bee';
import MapView from '../../../components/MapView';
import ManService from '../../../services/ManService';
import DatePicker from "bee-datepicker";
import { relative } from 'path';
import { IPageDetailProps, IPageDetailState, PageModel } from '../../../services/Model/Models';
import { Info } from '../../../utils';

interface IOtherProps {
    
} 

interface IOtherState {
 dateRange?:string[],
 data:Array<any>
}

type IPageProps = IOtherProps & IPageDetailProps;
type IPageState = IOtherState & IPageDetailState;

class ManLocation extends React.Component<IPageProps,IPageState> {
    
    id:string='';

    state:IPageState={
        isLoading:false,
        record:{},
        //dateRange:[],
        data:[]
    }
    
    isPage=()=>{

        return this.props.match&&this.props.history;
    }

    componentDidMount() {
    
        if(this.isPage()){
            this.id=this.props.match.params.id;
        }else{
            //in dailog
            const m1=new RegExp('/location-man/:id'.replace(':id','\w?'));
            this.id=this.props.url.replace(m1,'');
        }

        if(this.id!='0'){

            this.handler_search();
        }
    }

    loadData=async (args)=>{

        this.setState({isLoading:true});

        let result = await ManService.searchLocation(args) as PageModel<any>;

        if(result.data.length==0){

            Info("暂无记录");
        }

        this.setState({data:result.data,isLoading:false});
    }
    goBack=(flag:number=0)=>{
        if(this.isPage()){
            this.props.history.goBack();
        }else{
            this.props.handlerBack(flag);
        }
    }

    handler_search=()=>{

        var args={
            manId:this.id,
            createDate:this.state.dateRange==null||this.state.dateRange.length==0?"":this.state.dateRange[0]+'~'+this.state.dateRange[1]
        };
        this.loadData(args);
    }

    onDatePickerChange = (dates:any[],dateStr1:string,dateStr2:string[] )  => {

        this.setState({dateRange:dateStr2})
    }

    render() {

        return (<div>
            <Loading container={this} show={this.state.isLoading}/>
            <MapView width={730} height={500} locations={this.state.data} />
            <div style={{padding:'5px',backgroundColor:"lightgray", position:'absolute',left:'10px',top:'15px'}}>
            <ul style={{display:'flex'}}>
                
                <li>
                    <DatePicker.RangePicker                             
                            placeholder={'开始 ~ 结束'}
                            dateInputPlaceholder={['开始', '结束']}
                            onChange={this.onDatePickerChange}
                            showClear={true}
                            showClose={true}
                    />
                </li>
                <li><Button colors="info" onClick={this.handler_search}><Icon type='uf-search' />查询</Button></li>
            </ul>
            </div>
               
        </div>)
    }
}

export default Form.createForm()(ManLocation);