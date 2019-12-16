import * as React from 'react';
import {Panel, PageLayout,Navbar,Icon,Select,Tile, PanelGroup,Tabs,Row, Col,Label,Form,Radio, Breadcrumb } from 'tinper-bee';

import './index.scss';
import ManBussFullPanel from '../../../components/Buss/ManBussFullPanel';
import {PageModel,IPageDetailProps,IPageDetailState,PopPageModel} from '../../../services/Model/Models';

interface IOtherProps {
    
} 

interface IOtherState {
  id:string
}

type IPageProps = IOtherProps & IPageDetailProps;
type IPageState = IOtherState & IPageDetailState;

class ProcessView extends React.Component<IPageProps,IPageState> {
	
	  id:string='';
    state:IPageState={
		isLoading:false,
        record:{},
        id:''
    }
	
	  isPage=()=>{

        return this.props.match&&this.props.history;
    }
    componentDidMount() {

		    if(this.isPage()){

            this.id=this.props.match.params.id;
        }else{
            //in dailog
            const m1=new RegExp('/process-view/:id'.replace(':id','\w?'));
            this.id=this.props.url.replace(m1,'');
        }

        this.setState({id:this.id});
  }
	goBack=(flag:number=0)=>{
        if(this.isPage()){
            this.props.history.goBack();
        }else{
            this.props.handlerBack(flag);
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
				    社戒管理
			    </Breadcrumb.Item>
			    <Breadcrumb.Item active>
              详细
			    </Breadcrumb.Item>
                <a style={{float:'right'}}  className='btn-link' onClick={()=>this.goBack} >返回</a>
			</Breadcrumb>
			:null}
			<ManBussFullPanel processId={this.state.id} manId="" ></ManBussFullPanel>
		</Panel>  )
    }
}

export default ProcessView;


	/** 
export default function ProcessView(props:any) {


    const [count, setCount] = useState(0);
  
    useEffect(() => {
      // Update the document title using the browser API
      document.title = `You clicked ${count} times`;
    });
  	
    return (
		<ProcessInfoBussPanel {...props}></ProcessInfoBussPanel>
    );
  }
  ***/