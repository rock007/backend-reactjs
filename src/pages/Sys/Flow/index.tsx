import * as React from 'react';
import {Panel, Loading,Row, Col,Form,Breadcrumb } from 'tinper-bee';

import SysService from '../../../services/SysService';
import {IPageDetailProps, IPageDetailState} from '../../../services/Model/Models';

import { getValidateFieldsTrim } from '../../../utils/tools';
import { Info, Warning } from '../../../utils';

import FlowPanel from '../../../components/WorkFlow';

const FormItem = Form.FormItem;

interface IOtherProps {
    
} 

interface IOtherState {
    procId:string
}

type IPageProps = IOtherProps & IPageDetailProps;
type IPageState = IOtherState & IPageDetailState;

 class FlowPage extends React.Component<IPageProps,IPageState> {

    id:string=''
    
    state:IPageState={
        isLoading:false,
        record:{},
        procId:''
    }

    isPage=()=>{

        return this.props.match&&this.props.history;
    }
    componentDidMount() {
        if(this.isPage()){

            this.id=this.props.match.params.id;
        }else{
            //in dailog
            const m1=new RegExp('/sys/grid-edit/:id'.replace(':id','\w?'));
            this.id=this.props.url.replace(m1,'');
        }

        if(this.id!=null&&this.id!='0'){

            this.setState({procId:this.id});
        }
    }
    loadData=async (id)=>{

        const  data=await SysService.getGridById(id);
      
        this.setState({record:data,isLoading:false});
    }

    submit=(e)=>{

        this.props.form.validateFields((err, _values) => {

        let values = getValidateFieldsTrim(_values);
       
        if (err) {
            console.log('校验失败', values);
            Warning("请检查输入数据，验证失败");
        } else {

            //this.doSave(values);
            this.setState({isLoading:true});

            if(values.areaId&&values.areaId!=''){

                let oo=JSON.parse(values.areaId);
                values.areaId=oo.refpk;
                values.areaName=oo.refname;
            }
            if(values.linkUid&&values.linkUid!=''){

                let oo=JSON.parse(values.linkUid);
                values.linkUid=oo.refpk;
                values.linkUserName=oo.refname;
            }

            values['cellId']=this.id!=='0'?this.id:null;

            SysService.submitGrid(values)
                .then((resp)=>{
    
                    Info(resp);
                    this.goBack(1);
                })
                .catch((resp)=>{
    
                    this.setState({isLoading:false});
                    Warning(resp.data);
                });
        }
    });

}

goBack=(flag:number=0)=>{
    if(this.isPage()){
        this.props.history.goBack();
    }else{
        this.props.handlerBack(flag);
    }
}

  render() {
        const { getFieldProps, getFieldError } = this.props.form;

        return ( <Panel>
            <Loading container={this} show={this.state.isLoading}/>
              {
                  this.isPage()?<Breadcrumb>
                  <Breadcrumb.Item href="#">
                    工作台
                  </Breadcrumb.Item>
                  <Breadcrumb.Item href="#">
                    系统管理
                  </Breadcrumb.Item>
                  <Breadcrumb.Item href="#">
                    工作流
                  </Breadcrumb.Item> 
                  <Breadcrumb.Item active>
                    查看
                  </Breadcrumb.Item>
                  <a style={{float:'right'}}  className='btn-link' onClick={()=>this.goBack} >返回</a>
              </Breadcrumb>:null
              }
           
            <Row>
                <Col md="12">
                    <FlowPanel procId={this.state.procId} />
                </Col>
            </Row>
        </Panel >)
    }
}

export default Form.createForm()(FlowPage);