import * as React from 'react';

import 'ac-multi-tabs/dist/index.css';

import { Row,Col, FormControl,Label,Form,Button,Icon ,Radio } from 'tinper-bee';

import PopDialog from '../../../../components/Pop';
import MenuPanel from '../../Menu/Panel';

import './index.scss';

const FormItem = Form.FormItem;

interface IPageProps {
    
    onCloseEdit:()=>void,
    isShow:boolean,
    record?:any
}
interface IPageState {
    //record?:any,
    selectedValue?:any,
    typeSelected:any
}

export  class RolePermissionPage extends React.Component<IPageProps,IPageState> {

    state:IPageState={
        typeSelected:''
    }
    componentDidMount() {

    }
    onCloseEdit = () => {

        this.props.onCloseEdit();
    }

    submit=(e)=>{

      

    }
    onMenuTreeClick=(selects,e)=>{

        if(selects!=null&&selects.length>0){
            this.setState({selectedValue:e.selectedNodes[0].props.ext,typeSelected:''});
        }

    }

    render() {
        
        let me=this;
        return ( <PopDialog
            show={this.props.isShow}
            title="角色权限"
            size='sm'
            autoFocus={false}
            enforceFocus={false}
            close={this.onCloseEdit}>
            <Row>
                <Col md="12">
                    <MenuPanel  onSelected={this.onMenuTreeClick}  isCheckbox={true} allowType={[1,2,3]}></MenuPanel>
                    
                    <FormItem style={{'paddingLeft':'106px'}}>
                        <Button shape="border" style={{"marginRight":"8px"}} onClick={this.onCloseEdit} >取消</Button>
                        <Button colors="primary"  onClick={this.submit}>保存</Button>
                    </FormItem>

                </Col>
            </Row>
        </PopDialog>)
    }
}

export default RolePermissionPage;