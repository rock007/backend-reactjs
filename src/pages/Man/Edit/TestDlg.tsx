import * as React from 'react';
import {Panel, PanelGroup, Icon,Select, FormControl,Upload ,Row, Col,Label,Form,Radio, Breadcrumb } from 'tinper-bee';

import PopDialog from '../../../components/Pop';
import { appRouters } from '../../../components/Router/router.config';

import './index.scss';

interface IPageProps {
    url:string,
    title?:string,
    isShow:boolean,
    onClose:()=>void
}
interface IPageState {
   
}

class TestDlog extends React.Component<IPageProps,IPageState> {
    
    state:IPageState={
 
    }
    
    constructor(args) {
        super(args);
        
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        let _this = this;
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

     /**
     * 关闭Modal
     */
    onCloseEdit = () => {
        this.setState({rowData: {}, btnFlag: 0});
        this.props.onClose();
    }

    /**
     *
     * @description 底部按钮是否显示处理函数
     * @param {Number} btnFlag 为页面标识
     * @returns footer中的底部按钮
     */
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
    handleSelect(activeKey) {
        this.setState({activeKey:activeKey});
    }

    render() {
        
        const _this = this;
        // console.log('rowData', allowanceStandard);
        let A=appRouters[5].component;
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
            
           ${this.props.url}

           <A/>

        </PopDialog>)
    }
}

export default TestDlog;