import * as React from 'react';
import {Panel, Tabs,Button,Icon,Label,Row, Col,Breadcrumb } from 'tinper-bee';

import './index.scss';
import ManInfoPanel from '../../../components/Buss/ManInfoPanel';
import TimelinePanel from '../../../components/Buss/TimelinePanel';
import ManProcessListPanel from '../../../components/Buss/ManProcessListPanel';

import {PageModel,IPageDetailProps,IPageDetailState,PopPageModel} from '../../../services/Model/Models';
import ManService from '../../../services/ManService';
import PageDlog from '../../../components/PageDlg';

interface IOtherProps {
    
} 

interface IOtherState {
	isShowProcessPop:boolean,
	isPopPage:boolean,
	pageModel: PopPageModel,
	
	manId:string
}

type IPageProps = IOtherProps & IPageDetailProps;
type IPageState = IOtherState & IPageDetailState;

class ManView extends React.Component<IPageProps,IPageState> {
	
	id:string='';

    state:IPageState={
		isLoading:false,
		record:{},
		isShowProcessPop:false,
		    
        isPopPage:false,
		pageModel:new PopPageModel(),
		manId:''
    }

	isPage=()=>{

        return this.props.match&&this.props.history;
    }
    componentDidMount() {
		if(this.isPage()){

            this.id=this.props.match.params.id;
        }else{
            //in dailog
            const m1=new RegExp('/man-view/:id'.replace(':id','\w?'));
            this.id=this.props.url.replace(m1,'');
        }

        if(this.id!='0'){

			this.setState({manId:this.id});
        }
	}
	
    goBack=()=>{
        if(this.isPage()){
            this.props.history.goBack();
        }else{
            this.props.handlerBack();
        }
    }
	go2Page=(url,title:string='查看',isPage:boolean=true,size:'sm'|'lg'|"xlg"='lg')=>{
        
        if(isPage){
            this.props.history.push(url);
        }else{
            const model=new PopPageModel(title,url);

            model.size=size;

            this.setState({isPopPage:true,pageModel:model});
        }
	}
	

    render() {
        
        return ( <Panel>
			{
				this.isPage()?<Breadcrumb>
			    <Breadcrumb.Item href="#">
			      工作台
			    </Breadcrumb.Item>
                <Breadcrumb.Item href="#">
                  档案库
			    </Breadcrumb.Item>
			    <Breadcrumb.Item active>
                   详细
			    </Breadcrumb.Item>
                <a style={{float:'right'}}  className='btn-link' onClick={()=>this.goBack()} >返回</a>
			</Breadcrumb>
			:null}

            <Row>
            <Col md={5} style={{paddingLeft:'15px'}}>
                <ManInfoPanel manId={this.state.manId}/>
            </Col>
            <Col md={7} style={{paddingLeft:'20px'}}>
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab='概览' key="1">
                   		<ManProcessListPanel manId={this.state.manId} handler_goto={this.go2Page}></ManProcessListPanel>
                	</Tabs.TabPane>
                    <Tabs.TabPane tab='操作日志' key="2">
                        <TimelinePanel manId={this.state.manId}></TimelinePanel>
                    </Tabs.TabPane>
                </Tabs>
            </Col>
            </Row>

            <PageDlog  isShow={this.state.isPopPage} model={this.state.pageModel}
                    onClose={()=>this.setState({isPopPage:false})} >
            </PageDlog>
        </Panel >)
    }
}

export default ManView;