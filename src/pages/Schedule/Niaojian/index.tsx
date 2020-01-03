import * as React from 'react';
import {Panel,Radio,Tag,Breadcrumb,ButtonGroup,Button } from 'tinper-bee';

import Alert from '../../../components/Alert';
import DataGrid from '../../../components/DataGrid';
import PageDlog from '../../../components/PageDlg';

import {PageModel, PopPageModel, IPageDetailProps, IPageDetailState} from '../../../services/Model/Models';
import ManService from '../../../services/ManService';
import { Info } from '../../../utils';
import { openPage } from '../../../utils/tools';
import AppConsts from '../../../lib/appconst';

interface IOtherProps {
    
} 

interface IOtherState {
    page1:PageModel<any>,
    pageModel:PopPageModel,
    isPopPage:boolean,
    //examType:number,
    isAlterShow:boolean
}

type IPageProps = IOtherProps & IPageDetailProps;
type IPageState = IOtherState & IPageDetailState;

 class NiaojianSchedulePage extends React.Component<IPageProps,IPageState> {

    id:string='';

    examType:string=''

    pageIndex=1
    pageSize=10
    orderBy=[]

    state:IPageState={
        page1:new PageModel<any>(),
        isLoading:false,
        pageModel:new PopPageModel(),
        isPopPage:false,

        record:{},
        //examType:0,
        isAlterShow:false
    }

    isPage=()=>{

        return this.props.match&&this.props.history;
    }

    componentDidMount() {

        if(this.isPage()){

            this.id=this.props.match.params.id;
        }else{
            //in dailog
            const m1=new RegExp('/niaojian-schedule/:id'.replace(':id','\w?'));
            this.id=this.props.url.replace(m1,'');
        }

        this.search();
    }

    
    search= ()=>{
     
        this.setState({isLoading:true});
        this.loadData({processId:this.id});
    }

    loadData=async (args:any)=>{
        
        this.setState({isLoading:true});
        
        args['orderby']=this.orderBy;
        args['examType']=this.examType;
        let page1 = await ManService.searchNiaojianPlan(args, this.pageIndex,this.pageSize) as PageModel<any>;

        this.setState({page1:page1,isLoading:false});
    }

    onPageChange=(pageIndex:number,pageSize:number,orderBy:Array<any>)=>{

        this.pageIndex=pageIndex;
        this.pageSize=pageSize;
        this.orderBy=orderBy;
        this.search();
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
    
    handler_gengrate=async ()=>{

        this.setState({isLoading:true,isAlterShow:false});

       await ManService.submitNiaojianGenerate({processId:this.id}).then(()=>{

            //Info('尿检计划生成成功');
            this.search();
        })
        .catch((err)=>{
            Error('尿检计划生成失败');
        }).finally(()=>{
            this.setState({isLoading:false});
        });
    }

    render() {

        const columns = [
            { title: '姓名', dataIndex: 'realName', key: 'realName',textAlign:'center', width: 100 },
            { title: '性别', dataIndex: 'sex', key: 'sex', textAlign:'center',width: 80 },
            { title: '联系方式', dataIndex: 'linkPhone', key: 'linkPhone',textAlign:'center', width: 120 },
            { title: '时间区间', dataIndex: 'startDate', key: 'startDate', textAlign:'center',width: 180,render(text,record,index) {

                return text+'~'+record.endDate;
            }},
            { title: '第几年', dataIndex: 'year', key: 'year', textAlign:'center',width: 80 },
            { title: '状态', dataIndex: 'status', key: 'status', textAlign:'center',width: 100 ,
                render(text,record,index) {

                    if(text==0) return "未到";
                    if(text==1) return <Tag colors="warning">待操作</Tag>;
                    if(text==2) return <Tag colors="success">已完成</Tag>;
                    if(text==3) return <Tag colors="danger">已过期</Tag>;

                    return text;
            }},
            { title: '完成时间', dataIndex: 'finishDate', key: 'finishDate', textAlign:'center',width: 120 },
            { title: '结果', dataIndex: 'result', key: 'result', textAlign:'center',width: 100 }
          ];
        
          const toolBtns = [{
            value:'重新生成',
            bordered:false,
            colors:'primary',
            onClick:()=>{
                
               this.setState({isAlterShow:true});
            }
        },{
            value:'打印',
            iconType:'uf-print',
            onClick:()=>{

                openPage("report/niaojianAll?ids="+this.id+'&uid='+AppConsts.session.userId); 
            }
        }];

        return ( <Panel>
            {this.isPage()?(<Breadcrumb>
			    <Breadcrumb.Item href="#">
			      工作台
			    </Breadcrumb.Item>
			    <Breadcrumb.Item>
                  社戒管理
			    </Breadcrumb.Item>
			    <Breadcrumb.Item active>
			      尿检计划
			    </Breadcrumb.Item>
			</Breadcrumb>):null}
            
            <Panel>
            <Radio.RadioGroup
                defaultValue="0"
                onChange={(v)=>{this.examType=v;this.search();}}>
                <Radio value="0" >尿检计划</Radio>
                <Radio value="2" >走访计划</Radio>
            </Radio.RadioGroup>
            <ButtonGroup style={{ margin: 10 }}>
                <Button colors="primary" onClick={()=>this.setState({isAlterShow:true})}>重新生成</Button>
                <Button colors="default" onClick={()=>
                    openPage("report/niaojianAll?ids="+this.id+'&uid='+AppConsts.session.userId)
                } >打印</Button>
            </ButtonGroup>
            </Panel>
            <DataGrid
                        isLoading={this.state.isLoading}
                        multiSelect={{type:'none'}}
                        //toolBtns={toolBtns} 
                        columns={columns}
                        page={this.state.page1}
                        pageChange={this.onPageChange}/>

        <PageDlog  isShow={this.state.isPopPage} model={this.state.pageModel}
                    onClose={()=>this.setState({isPopPage:false})} >
        </PageDlog>
        <Alert show={this.state.isAlterShow} context="确定要重新生成计划吗?"
                           confirmFn={() => {
                               this.handler_gengrate();
                           }}
                           cancelFn={() => {
                              this.setState({isAlterShow:false})
                           }}
        />
        </Panel >)
    }
}

export default NiaojianSchedulePage;