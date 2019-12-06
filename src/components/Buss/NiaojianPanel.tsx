import * as React from 'react';
import {Panel,Tag} from 'tinper-bee';
import DataGrid from '../../components/DataGrid';
import ManService from '../../services/ManService';
import {PageModel,IPageCommProps,IListPageState,PopPageModel} from '../../services/Model/Models';
import { threadId } from 'worker_threads';

interface IOtherProps {
	manId:string,
	processId?:string
} 

interface IOtherState {
  page:PageModel<any>,
  isLoading:boolean,
  planData:any
}

type IPanelProps = IOtherProps ;
type IPanelState = IOtherState ;

export default class NiaojianPanel extends React.Component<IPanelProps,IPanelState> {
    
    pageIndex=1
    pageSize=10

    state:IPanelState={
      page:new PageModel<any>(),
      isLoading:false,
	
	  planData:{plan1:[],plan2:[],plan3:[],other:[]}
	  
    }
    componentDidMount() {

	  if(this.props.processId!=null&&this.props.processId!==''){
		this.loadPlanData(this.props.processId);
	  }else{
		  if(this.props.manId!=null&&this.props.manId!==''){
			this.loadData(this.props.manId);
		  }
	  }

	}
	componentWillReceiveProps(nextProps:IPanelProps) {
      
		if(nextProps.processId!=null&&nextProps.processId!==''){
			this.loadPlanData(nextProps.processId);
		  }else{
			  if(nextProps.manId!=null&&nextProps.manId!==''){
				this.loadData(nextProps.manId);
			  }
		  }
	}

    loadPlanData=async (id)=>{
		
		this.setState({isLoading:true});

      //args['orderby']=this.orderBy;
	  let page1 = await ManService.searchNiaojianPlan({processId:id,year:1},this.pageIndex,this.pageSize) as PageModel<any>;
	  let page2 = await ManService.searchNiaojianPlan({processId:id,year:2},this.pageIndex,this.pageSize) as PageModel<any>;
	  let page3 = await ManService.searchNiaojianPlan({processId:id,year:3},this.pageIndex,this.pageSize) as PageModel<any>;

	  let page4 = await ManService.searchNiaojian({processId:id,testType:1},this.pageIndex,this.pageSize) as PageModel<any>;

      this.setState({ planData:{plan1:page1.data,plan2:page2.data,plan3:page3.data,other:page4.data},isLoading:false});
	}
	loadData=async (id)=>{
		
		this.setState({isLoading:true});

		//args['orderby']=this.orderBy;
		let args={manId:id};
		let page = await ManService.searchNiaojian(args,this.pageIndex,this.pageSize) as PageModel<any>;
		this.setState({page:page,isLoading:false});
	}

    render() {
		
		if(this.props.processId==null||this.props.processId===''){

			return this.renderNiaojianGrid();
		}
		
        return (<div>
			<PlanItem title='第一年' data={this.state.planData.plan1} ></PlanItem>
			<PlanItem title='第二年' data={this.state.planData.plan2} ></PlanItem>
			<PlanItem title='第三年' data={this.state.planData.plan3} ></PlanItem>

			<NiaojianGridItem title='随机尿检' data={this.state.planData.other} ></NiaojianGridItem>
            </div>);
	}
	

	//grid
	onPageChange=(pageIndex:number,pageSize:number,orderBy:Array<any>)=>{

		this.pageIndex=pageIndex;
		this.pageSize=pageSize;
	   
		this.loadData(this.props.manId);
	}
	renderNiaojianGrid(){

		    
		const columns = [
			
            { title: '尿检时间', dataIndex: 'testDate', key: 'testDate', textAlign:'center',width: 120,  },
            { title: '尿检类型', dataIndex: 'testType', key: 'testType', textAlign:'center',width: 120, render(text,record,index) {

                return text==0?'常规':'随机' ;
              }},
            { title: '是否本地', dataIndex: 'isLocal', key: 'isLocal', textAlign:'center',width: 120,  render(text,record,index) {

                return text==1?'本地':'异地' ;
              }},
            { title: '尿检地点', dataIndex: 'address', key: 'address', textAlign:'center',width: 200 },
            { title: '结果', dataIndex: 'result', key: 'result', textAlign:'center',width: 100  },
            { title: '创建时间', dataIndex: 'createDate', key: 'createDate', textAlign:'center',width: 120 },

		  ];
	 
			return (<div>
				 <DataGrid
				 multiSelect={{type:"none"}}
				 isLoading={this.state.isLoading}
				 columns={columns}
				 page={this.state.page}
				 pageChange={this.onPageChange}
				 
			 />
				</div>);
	}
}




export  function PlanItem(props:any) {

	/*** 
    const [count, setCount] = useState(0);
  
    useEffect(() => {
      // Update the document title using the browser API
     //!! document.title = `You clicked ${count} times`;
	});
	****/
  
	const renderStatus=(status:number):any=>{

		if(status==0){
			return <Tag colors="info">未到</Tag>;
		}else if(status==1){
			return <Tag colors="warning">待尿检</Tag>;
		}else if(status==2){
			return <Tag colors="success">已完成</Tag>;
		}else if(status==3){
			return <Tag colors="danger">已过期</Tag>;
		}else {
			return <Tag colors="danger">未知类型</Tag>;
		}

	}

    return (

        <div style={{padding:5}}>
			<span>{props.title}</span>
			<div style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
					{
						props.data.map((item,index)=>{

							return (
						<div className="block-view">
							<span>{item.startDate}~{item.endDate}</span>
							{
								item.result!=null&&item.result!=''?<span>{ item.result}</span>:null
							}
							<span>{renderStatus(item.status)}</span>
						</div>
							);

						})
					}
					
			</div>
    </div>
    );
  }
  

  
export  function NiaojianGridItem(props:any) {
  
    return (

        <div style={{padding:5}}>
			<span>{props.title}</span>
			<div style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
					{
						props.data.map((item,index)=>{

							return (
						<div className="block-view">
							<span>{item.testDate}</span>
							<strong>{ item.result}</strong>
						</div>
							);

						})
					}
					
			</div>
    </div>
    );
  }