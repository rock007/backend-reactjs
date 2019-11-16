import * as React from 'react';
import PopDialog from '../../components/Pop';
import { appRouters } from '../../components/Router/router.config';

interface IProps {
    url:string,
    title?:string,
    isShow:boolean,
    onClose:()=>void
}
interface IState {
   
}

class PageDlog extends React.Component<IProps,IState> {
    
    state:IState={
 
    }
    
    constructor(args) {
        super(args);
        
    }

    componentWillReceiveProps(nextProps) {
       
        let {url, isShow} = this.props;
        let {url: nextUrl, isShow: nextIsShow} = nextProps;
        // 判断是否 btnFlag新弹框状态  currentIndex当前选中行
        if (url !== nextUrl || isShow !== nextIsShow) {

            if(nextIsShow){

            }
        }

    }

    componentDidMount() {

    }

    onHandleBtns = (btnFlag) => {
        let _this = this;
        let btns = [

            {
                label: '取消',
                fun: this.props.onClose,
                shape: 'border'
            },
            {
                label: '确定',
                //fun: _this.onSubmitEdit,
                colors: 'primary'
            },
        ];

        if (btnFlag == 2) {
            btns = [];
        }
        return btns;
    }
   
    getRoute=()=>{
        
        const route=appRouters.find((v,i)=>v.path==this.props.url);
        if(route!=null){
          console.log('go2Page:'+route.path);
          //this.props.history.push(route.path);
        }else{
          //this.props.history.push('/exception?code=404');
        }

    }

    render() {
        
        const _this = this;

        const one= appRouters.find((v,i)=>v.path==this.props.url);

        let A= one!=null?one.component:(<div>没有找到</div>);
        let btns = _this.onHandleBtns(0);

        return (   <PopDialog
            show={this.props.isShow}
            title={this.props.title||'查看'}
            size='lg'
            btns={btns}
            autoFocus={false}
            enforceFocus={false}
            close={this.props.onClose}
            className="single-table-pop-model"
        >
           {this.props.url}
           <A/>
        </PopDialog>)
    }
}

export default PageDlog;