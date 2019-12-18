import * as React from 'react';

import { Row,Col, Panel,Loading,Form,Button,Icon ,Radio } from 'tinper-bee';

import MenuPanel from '../../Menu/Panel';

import './index.scss';
import { IPageDetailProps, IPageDetailState } from '../../../../services/Model/Models';
import SysService from '../../../../services/SysService';
import { getValidateFieldsTrim, Warning, Info } from '../../../../utils';

interface IOtherProps {
    
} 

interface IOtherState {
 isLoaded:boolean  
}

type IPageProps = IOtherProps & IPageDetailProps;
type IPageState = IOtherState & IPageDetailState;

export  class RolePermissionPage extends React.Component<IPageProps,IPageState> {

    id:string=''

    state:IPageState={
        isLoading:false,
        record:[],
        isLoaded:false
    }
    isPage=()=>{

        return this.props.match&&this.props.history;
    }

    componentDidMount() {
 
        if(this.isPage()){

            this.id=this.props.match.params.id;
        }else{
            //in dailog
            const m1=new RegExp('/role-permission/:id'.replace(':id','\w?'));
            this.id=this.props.url.replace(m1,'');
        }

        if(this.id!=null&&this.id!='0'){

            this.loadData(this.id);
        }
    }
    loadData=async (id)=>{
        
        this.setState({isLoading:true});
        const  data=await SysService.getPermissionByRoleId(id);
      
        this.setState({record:data,isLoading:false,isLoaded:true});
    }
    goBack=(flag:number=0)=>{
        if(this.isPage()){
            this.props.history.goBack();
        }else{
            this.props.handlerBack(flag);
        }
    }
   
    onMenuTreeClick=(selects,e)=>{

        const node=e.node.props.ext;
        const isChecked=e.checked;

        this.setState({isLoading:true});
            const values={
                roleId:this.id,
                permissionId:node.id,
                act:isChecked?1:0
            };
            SysService.submitRolePermisson(values)
                .then((resp)=>{

                    //Info("操作成功");
                })
                .catch((resp)=>{
                    Warning("操作失败");
            }).finally(()=>{
                this.setState({isLoading:false});
            });

        

    }

    render() {
        
        let me=this;

        const roleIds=this.state.record.map((m,i)=>m.id+'')

        return ( <Panel>
            <Row>
                <Col md="12">
                    <Loading container={this} show={this.state.isLoading}/>:
                    {
                        this.state.isLoaded?
                        <MenuPanel  onChecked={this.onMenuTreeClick}  
                        isCheckbox={true} 
                        defaultCheckedKeys={roleIds}
                        allowType={[1,2,3]}></MenuPanel>:null
                    }

                </Col>
            </Row>
        </Panel>)
    }
}

export default RolePermissionPage;