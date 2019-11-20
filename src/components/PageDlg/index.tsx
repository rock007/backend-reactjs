import * as React from 'react';
import PopDialog from '../../components/Pop';
import {PopPageModel} from '../../services/Model/Models';
import { appRouters } from '../../components/Router/router.config';

interface IProps {
    model: PopPageModel,
    isShow:boolean,
    onClose:()=>void,
    //size?:'lg'|'lg'|"xlg"
}
interface IState {
   
}

class PageDlog extends React.Component<IProps,IState> {
    /** 
    componentWillReceiveProps(nextProps) {
       
        let {model, isShow} = this.props;
        let {model: nextmodel, isShow: nextIsShow} = nextProps;
        // 判断是否 btnFlag新弹框状态  currentIndex当前选中行
        if (model !== nextmodel || isShow !== nextIsShow) {

            if(nextIsShow){

            }
        }
    }

    componentDidMount() {

    }
*/
    render() {

        const one= appRouters.find((v,i)=>{

            if(v.path.indexOf(':')!=-1){
                const m1=new RegExp(v.path.replace(':id','\w?'));
                return m1.test(this.props.model.url);
            }else{

                return v.path===this.props.model.url;
            }
         
        });

        let A= one!=null?one.component:()=>(<div>没有找到</div>);
        
        return (   <PopDialog
            show={this.props.isShow}
            title={this.props.model.title}
            size={this.props.model.size||'lg'}
            autoFocus={false}
            enforceFocus={false}
            close={this.props.onClose}
            className="single-table-pop-model"
        >
           <A isPage={false} url={this.props.model.url} handlerBack={this.props.onClose}/>
        </PopDialog>)
    }
}

export default PageDlog;