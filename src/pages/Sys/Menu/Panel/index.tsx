import * as React from 'react';
import {Panel, Tree,Message ,Icon,Select, FormControl,Row, Col,Label,Form,Radio, Breadcrumb } from 'tinper-bee';

import SysService from '../../../../services/SysService';

interface IPanelProps {
    onSelected?:(rec:any,e:any)=>void,
    isCheckbox:boolean,
    allowType:number[],
    showRoot:boolean,
}
interface IPanelState {
    value?:string,
    data:any[],
}

 class MenuPanel extends React.Component<IPanelProps,IPanelState> {
   
    static defaultProps: IPanelProps = {
      isCheckbox:false,
      allowType:[1],
      showRoot:false,
    }

    state:IPanelState={
        value:'',
        data:[],
    }
    async componentDidMount() {
        let data = await SysService.getAllMenu();

        this.setState({data:this.props.showRoot?[data]: data.childs});
    }

/** 
    componentWillReceiveProps(nextProps) {
      let _this = this;
      let { selectKey} = this.props;
      let {selectKey: nextSelectKey} = nextProps;

      if (selectKey !== nextSelectKey) {

          this.setState({selectKey: nextSelectKey}); 
          
      }
  }
  ***/

    renderTreeNodes = (data) => {
    
      if(data==null||data.length==0) return;

        const loop = data => data.map((item) => {

        const icon=item.type==2?(<Icon type="uf-4square-3"  />):(item.type==3?(<Icon type="uf-pencil"  />):null);
        
          if (item.childs!=null&&item.childs.length>0) {
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
    console.log('onSelect', selectedKeys);
    if(this.props.onSelected!=null){
      this.props.onSelected.call(this,selectedKeys,info)
    }
  }
    render() {
        return ( <div className="menu-tree-left" style={{padding:"10px"}}>
            
              <div >
                <Tree className="menuTree" 
                    showLine 
                    showIcon
                    checkStrictly
                    checkable={this.props.isCheckbox}
                    cancelUnSelect={true}
                    defaultExpandAll
                    onSelect={this.onSelect}
                >
                  { this.renderTreeNodes(this.state.data)}
              </Tree>
              </div>
        </div >)
    }
}

export default MenuPanel;