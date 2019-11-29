import * as React from 'react';
import {Panel,  Form,Label,Button,Icon } from 'tinper-bee';
import MapView from '../../../components/MapView';
import ManService from '../../../services/ManService';
import DatePicker from "bee-datepicker";
import { relative } from 'path';

interface IPageProps {
    form:any,
    //in page
    history:any,
    match:any,

    //in pop
    isPage?:boolean,
    url?:string,
    handlerBack?:()=>void
}
interface IPageState {
    isLoading:boolean,
    record:any,
}

class ManLocation extends React.Component<IPageProps,IPageState> {
    
    id:string='';

    state:IPageState={
        isLoading:false,
        record:{},
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

          //  this.loadData(this.id);
        }
    }

    loadData=async (id)=>{

        this.setState({isLoading:true});
        let result = await ManService.findDayoffById(id);

        this.setState({record:result,isLoading:false});
    }
    goBack=()=>{
        if(this.isPage()){
            this.props.history.goBack();
        }else{
            this.props.handlerBack();
        }
    }

    render() {

        return (<div>

            <MapView width={730} height={500}/>
            <div style={{padding:'5px',backgroundColor:"lightgray", position:'absolute',left:'10px',top:'15px'}}>
            <ul style={{display:'flex'}}>
                
                <li>
                    <DatePicker.RangePicker                             
                            placeholder={'开始 ~ 结束'}
                            dateInputPlaceholder={['开始', '结束']}
                            showClear={true}
                            showClose={true}
                    />
                </li>
                <li><Button colors="info"><Icon type='uf-search' />查询</Button></li>
            </ul>
            </div>
               
        </div>)
    }
}

export default Form.createForm()(ManLocation);