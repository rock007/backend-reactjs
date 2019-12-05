import * as React from 'react';
import {Panel,  Form,Label,Breadcrumb} from 'tinper-bee';

import BussService from '../../../services/BussService';

const FormItem = Form.FormItem;;

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

class YellowCardView extends React.Component<IPageProps,IPageState> {
    
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
            const m1=new RegExp('/yellowcard/:id'.replace(':id','\w?'));
            this.id=this.props.url.replace(m1,'');
        }

        if(this.id!=null&&this.id!=''&&this.id!='0'){

            this.loadData(this.id);
        }
    }

    loadData=async (id)=>{

        this.setState({isLoading:true});
        let result = await BussService.findCardById(id);

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

        return (<Panel>
            {
				this.isPage()?<Breadcrumb>
			    <Breadcrumb.Item href="#">
			      工作台
			    </Breadcrumb.Item>
                <Breadcrumb.Item href="#">
				  业务查询
			    </Breadcrumb.Item>
			    <Breadcrumb.Item active>
                   红黄牌
			    </Breadcrumb.Item>
                <a style={{float:'right'}}  className='btn-link' onClick={()=>this.goBack()} >返回</a>
			</Breadcrumb>
			:null}
                <Form className='edit_form_pop'>
                <FormItem>
                    <Label>类型</Label>
                    <strong>{this.state.record.cardType}</strong>
                </FormItem>
                <FormItem>
                    <Label>发送时间</Label>
                    <strong>{this.state.record.createDate}</strong>
                </FormItem>
                <FormItem>
                    <Label>接收者</Label>
                    <strong>{this.state.record.toUser}</strong>
                </FormItem>
                <FormItem>
                    <Label>角色</Label>
                    <strong>{this.state.record.toRole}</strong>
                </FormItem>
                <FormItem>
                    <Label>原因</Label>
                    <strong>{this.state.record.content}</strong>
                </FormItem>

                <FormItem>
                    <Label>关联戒毒人员</Label>
                    <strong>{this.state.record.realName}</strong>
                </FormItem>
              
                </Form>
               
        </Panel>)
    }
}

export default Form.createForm()(YellowCardView);