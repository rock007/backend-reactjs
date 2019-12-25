import * as React from 'react';
import {Label, Tree,Icon} from 'tinper-bee';

import SysService from '../../../../services/SysService';

interface IPanelProps {
    onSelected?:(rec:any,e:any)=>void,
    onChecked?:(rec:any,e:any)=>void,
    isCheckbox:boolean,
    allowType:number[],
    showRoot:boolean,
    defaultCheckedKeys:string[]
}
interface IPanelState {
    value?:string,
    data:any[],
    defaultCheckedKeys:any[]
}

 class MenuPanel extends React.Component<IPanelProps,IPanelState> {
   
    defaultExpandedKeys=[]

    static defaultProps: IPanelProps = {
      isCheckbox:false,
      allowType:[1],
      showRoot:false,
      defaultCheckedKeys:[]
    }

    state:IPanelState={
        value:'',
        data:[],
        defaultCheckedKeys:[]
    }
    componentDidMount() {
        this.loadData();
    }

    loadData= async ()=>{
      let data = await SysService.getAllMenu();
      this.setState({data:this.props.showRoot?[data]: data.childs});
    }
/*** 
    componentWillReceiveProps(nextProps:IPanelProps) {
      let _this = this;
      let { defaultCheckedKeys} = this.props;
      
      if(nextProps.defaultCheckedKeys!=defaultCheckedKeys){

        //this.setState({defaultCheckedKeys:nextProps.defaultCheckedKeys});
        this.forceUpdate();
      }

  }
  ****/

    renderTreeNodes = (data) => {
    
      if(data==null||data.length==0) return;

        const loop = data => data.filter((m,i)=>this.props.allowType.includes(m.type||0)).map((item) => {

        const icon=item.type==2?(<Icon type="uf-pencil"  />):null;
        
          if (item.childs!=null&&item.childs.length>0) {

            //console.log('menu tree:'+item.id);
            this.defaultExpandedKeys.push(item.id);
            return (
              <Tree.TreeNode key={item.id} title={item.name} isLeaf={item.isLeaf} ext={item} icon={icon|| <Icon type="uf-treefolder"  />}>
                {loop(item.childs)}
              </Tree.TreeNode>
            );
          }

          return <Tree.TreeNode key={item.id} title={item.name} isLeaf={true} ext={item}  icon={icon||<Icon type="uf-list-s-o" />} />;
        
      });
      return loop(data);
  }

  onSelect=(selectedKeys, info) =>{

    if(this.props.onSelected!=null){
      this.props.onSelected.call(this,selectedKeys,info)
    }
  }
  onCheck=(keys, info) =>{
    console.log('onCheck', keys);
  
    if(this.props.onChecked!=null){
      this.props.onChecked.call(this,keys,info)
    }
  }
    render() {

        if(this.state.data.length==0) {
          return  (<Label>加载中...</Label>);
        }

        return ( <div className="menu-tree-left" style={{padding:"10px"}}>
            
              <div >
                <Tree className="menuTree" 
                    showLine 
                    showIcon
                    checkStrictly={true}
                    checkable={this.props.isCheckbox}
                    //cancelUnSelect={true}
                    
                    onSelect={this.onSelect}
                    onCheck={this.onCheck}
                    defaultExpandedKeys={this.defaultExpandedKeys}
                    defaultCheckedKeys = {this.props.defaultCheckedKeys}>
                  { this.renderTreeNodes(this.state.data)}
              </Tree>
              </div>
        </div >)
    }
}

export default MenuPanel;