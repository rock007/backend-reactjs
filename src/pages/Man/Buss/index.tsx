import * as React from 'react';
import {Panel, PageLayout,Navbar,Icon,Select,Tile, PanelGroup,Tabs,Row, Col,Label,Form,Radio, Breadcrumb } from 'tinper-bee';

import {PageModel,IPageDetailProps,IPageDetailState,PopPageModel} from '../../../services/Model/Models';
import ManBussFullPanel from '../../../components/Buss/ManBussFullPanel';

interface IOtherProps {
    
} 

interface IOtherState {
    
}

type IPageProps = IOtherProps & IPageDetailProps;
type IPageState = IOtherState & IPageDetailState;

class ManBussView extends React.Component<IPageProps,IPageState> {
    
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
            const m1=new RegExp('/man-buss/:id'.replace(':id','\w?'));
            this.id=this.props.url.replace(m1,'');
        }

        if(this.id!='0'){

            //this.loadData(this.id);
        }
    }
    goBack=()=>{
        if(this.isPage()){
            this.props.history.goBack();
        }else{
            this.props.handlerBack();
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
                   业务查看
			    </Breadcrumb.Item>
                <a style={{float:'right'}}  className='btn-link' onClick={()=>this.goBack()} >返回</a>
			</Breadcrumb>
			:null}
			<ManBussFullPanel manId={this.id}></ManBussFullPanel>
		</Panel> )
    }
}

export default ManBussView;