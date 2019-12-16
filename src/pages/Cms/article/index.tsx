import * as React from 'react';
import {Panel, Breadcrumb } from 'tinper-bee';

import CmsService from '../../../services/CmsService';
import {PageModel, PopPageModel,IPageDetailProps,IPageDetailState} from '../../../services/Model/Models';

interface IOtherProps {
    
} 

interface IOtherState {

}

type IPageProps = IOtherProps & IPageDetailProps;
type IPageState = IOtherState & IPageDetailState;

 class ArticleViewPage extends React.Component<IPageProps,IPageState> {

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
            const m1=new RegExp('/articles/:id'.replace(':id','\w?'));
            this.id=this.props.url.replace(m1,'');
        }

        if(this.id!='0'){

            this.loadData(this.id);
        }
    }

    loadData=async (id)=>{

        this.setState({isLoading:true});
        let result = await CmsService.findArticleById(id);
        this.setState({record:result,isLoading:false});
    }
    goBack=(flag:number=0)=>{
        if(this.isPage()){
            this.props.history.goBack();
        }else{
            this.props.handlerBack(flag);
        }
    }
    

  render() {

        const me=this;
       
        return ( <Panel>

            {this.isPage()?(
              <Breadcrumb>
			        <Breadcrumb.Item href="#">
			            工作台
			        </Breadcrumb.Item>
                    <Breadcrumb.Item href="#">
                        信息发布
			        </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        查看
			        </Breadcrumb.Item>
                    <a style={{float:'right'}}  className='btn-link' onClick={this.goBack.bind(this,0)} >返回</a>
                </Breadcrumb>)
                :null
            }
            
            <div dangerouslySetInnerHTML={{__html: this.state.record.contentHtml}} >
               
            </div>

        </Panel >)
    }
}

export default ArticleViewPage;