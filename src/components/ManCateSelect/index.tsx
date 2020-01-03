import * as React from 'react';
import {TreeSelect} from 'tinper-bee';
import SysService from '../../services/SysService';

import './index.scss';

interface IPanelProps {
  handlerOnChange?:(rec:string)=>void,
  isSelectLeaf?:boolean
}
interface IPanelState {
  data:any[],
  value?:any
}
export default class ManCateSelect extends React.Component<IPanelProps,IPanelState> {

  state:IPanelState={
    data:[]
  }
  async componentDidMount() {

    let data = await SysService.getManCateTree();
    this.setState({data:data.childs});
  }
  onChange = (m, label, extra) => {
    
    if(this.props.handlerOnChange!=null){
       this.props.handlerOnChange(m);
    }
    this.setState({value: m})
  }

  renderTreeNodes = (data) => {
    
    if(data==null||data.length==0) return;

    //let search=this.state.value||"";

    const loop = data => data.map((item) => {

      if (item.childs!=null&&item.childs.length>0) {
        return (
          <TreeSelect.TreeNode key={item.cateId}  disabled={this.props.isSelectLeaf||false}  value={item.cateId} title={item.cateName} isLeaf={item.isLeaf} ext={item}>
            {loop(item.childs)}
          </TreeSelect.TreeNode>
        );
      }
      return <TreeSelect.TreeNode key={item.cateId} value={item.cateId}  title={item.cateName} isLeaf={true} ext={item}/>;
    });
    return loop(data);
  }
  generateTreeData = (data) => {
    
    if(data==null||data.length==0) return;

    const loop = data => data.map((item) => {

      if (item.childs!=null&&item.childs.length>0) {
        return (
          <TreeSelect.TreeNode key={item.cateId} title={item.cateName} isLeaf={item.isLeaf} ext={item}>
            {loop(item.childs)}
          </TreeSelect.TreeNode>
        );
      }
      return <TreeSelect.TreeNode key={item.cateId} title={item.cateName} isLeaf={true} ext={item}/>;
    });
    return loop(data);
  }

  render() {

      return (<TreeSelect
                { ...this.props}
                showSearch={false}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="请选择"
                allowClear
                treeDefaultExpandAll
                //value={this.state.value}
                //onChange={this.onChange}
              >
                { this.renderTreeNodes(this.state.data)}
              </TreeSelect>)
  }
}