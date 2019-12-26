import * as React from 'react';
import {Panel, Breadcrumb,Col,Label,Select,Icon,Form,Row,Button,LoadingState} from 'tinper-bee';

import ReportService from '../../../services/ReportService';
import {IPageDetailProps,IPageDetailState} from '../../../services/Model/Models';
import RefManTreeTableSelect from '../../../components/RefViews/RefManTreeTableSelect';

const FormItem = Form.FormItem;
interface IOtherProps {
    
} 

interface IOtherState {

}

type IPageProps = IOtherProps & IPageDetailProps;
type IPageState = IOtherState & IPageDetailState;

 class WorkerLinkPage extends React.Component<IPageProps,IPageState> {

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
            const m1=new RegExp('/manager/:id'.replace(':id','\w?'));
            this.id=this.props.url.replace(m1,'');
        }

        if(this.id!='0'){

           // this.loadData(this.id);
        }
    }

    loadData=async (id)=>{

        this.setState({isLoading:true});
        let result = await ReportService.findWorkDescById(id);

        this.setState({record:result,isLoading:false});
    }
    goBack=()=>{
        if(this.isPage()){
            this.props.history.goBack();
        }else{
            this.props.handlerBack(0);
        }
    }

    handler_submit=()=>{

    }

  render() {
    let {getFieldProps, getFieldError} = this.props.form;
    const me=this;
       
        return ( <Panel>

            {this.isPage()?(
              <Breadcrumb>
			        <Breadcrumb.Item href="#">
			            工作台
			        </Breadcrumb.Item>
                    <Breadcrumb.Item href="#">
                        社工管理
			        </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        查看
			        </Breadcrumb.Item>
                    <a style={{float:'right'}}  className='btn-link' onClick={this.goBack} >返回</a>
                </Breadcrumb>)
                :null
            }
            
            <Row>
                <Col md="12">
                <Form className='edit_form_pop'>
        <FormItem>
            <Label>职务</Label>
            <Select
              style={{ width: 200, marginRight: 6 }}>
              <Select.Option value="4">专（兼）职社工</Select.Option>
             
              <Select.Option value="5">社区民警</Select.Option>
             
            </Select>
            <span className='error'>
                 {getFieldError('postion')}
            </span>
        </FormItem>

        <FormItem>
            <Label>姓名</Label>
            <RefManTreeTableSelect  {
                            ...getFieldProps('toUid', {
                                validateTrigger: 'onBlur',
                                //initialValue: JSON.stringify({refpk:this.state.record.toUid,refname:this.state.record.toUser}),
                                rules: [{ required: true ,
                                    pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/,
                                    message: <span><Icon type="uf-exc-t"></Icon><span>请选择戒毒人员</span></span>}]
                            })
            }/>
            
            <span className='error'>
                 {getFieldError('name')}
            </span>
        </FormItem>
        <FormItem style={{'paddingLeft':'106px'}}>
            <Button shape="border" onClick={this.goBack} className="reset" style={{"marginRight":"8px"}}>取消</Button>
            <LoadingState  colors="primary" show={ this.state.isLoading }  onClick={this.handler_submit}>保存</LoadingState>
        </FormItem>
    </Form>

                </Col>
                </Row> 

        </Panel >)
    }
}

export default Form.createForm()(WorkerLinkPage);