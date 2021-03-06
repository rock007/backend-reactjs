import React, { Component } from 'react';
import { Modal } from 'tinper-bee';
//import PropTypes from 'prop-types';
import BtnIcon from '../../components/Button';
import './index.scss';

interface IProps  {
    modalTitle?: string,//删除modal标题
    modalContent?: any,//modal内容，可传字符串和dom
    confirmFn: ()=>void,//点击确认按钮的回调
    cancelFn: ()=>void,//点击取消的回调
    confirmName?: string,
    cancelFnName?: string,
    showFooter?: boolean,//是否显示确认取消按钮
    showTitle?: boolean,//是否显示modal标题
    onShow?: ()=>void,//显示的钩子函数
    onHide?: ()=>void,//隐藏的钩子函数
    size?: "sm"|"lg"| "xlg"| "",//模态框尺寸
    dialogClassName?: string,//传递给模态框的样式
    hide: boolean,//主动调用隐藏modal

    className?:string
};

interface IState  {
    showModal:boolean
}

class DelModal extends Component<IProps,IState> {

    static defaultProps = {
        modalTitle: '警告',
        modalContent: '确认要删除么？',
        confirmFn: () => {
    
        },
        cancelFn: () => {
    
        },
        confirmName: '确定',
        cancelFnName: '取消',
        showFooter: true,
        showTitle: true,
        onShow: () => {
    
        },
        onHide: () => {
    
        }//,
        //hide: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            showModal: !this.props.hide
        };
    }
    componentWillReceiveProps(nextProps) {
        
        console.log('nextProps.hide:'+nextProps.hide);

        if (nextProps.hide!=null) {//当前hide是true,关闭模态框
            //console.log('nextProps.hide:'+nextProps.hide);
            this.setState({
                showModal: !nextProps.hide
            })
        }
    }
    close = () => {
        this.setState({
            showModal: false
        });
        this.props.cancelFn();
    }
    onConfirm = () => {
        this.setState({
            showModal: false
        });
        this.props.confirmFn();
    }
    open = () => {
        this.setState({
            showModal: true
        });
    }
    onHide = () => {
        this.setState({
            showModal: false
        });
        this.props.onHide()
    }
    render() {
        const { children, className, modalContent, modalTitle,
            confirmName, cancelFnName, showTitle, showFooter,
            onShow, dialogClassName, size } = this.props;
        let classes = 'del-confrim';
        if (className) {
            classes += ' ' + className
        }
        return (
            <span className={classes}>
                <span className="del-modal-title" onClick={this.open}>
                    {children}
                </span>
                <Modal className="del-confrim-modal"
                    show={this.state.showModal}
                    onHide={this.onHide}
                    onShow={onShow}
                    dialogClassName={dialogClassName}
                    size={size}
                >
                    {
                        showTitle ? (<Modal.Header closeButton>
                            <Modal.Title>{modalTitle}</Modal.Title>
                        </Modal.Header>) : ''
                    }
                    <Modal.Body>
                        {modalContent}
                    </Modal.Body>

                    {
                        showFooter ? (<Modal.Footer>
                            <BtnIcon onClick={this.close} iconType="uf-correct" size='sm' colors="primary" style={{ 'marginRight': '15px' }}>{cancelFnName}</BtnIcon>
                            <BtnIcon onClick={this.onConfirm} iconType="uf-close" size='sm' colors="primary">{confirmName}</BtnIcon>
                        </Modal.Footer>) : ''
                    }
                </Modal>
            </span>

        )
    }
}
//DelModal.propTypes = propTypes;
//DelModal.defaultProps = defaultProps;
export default DelModal;
