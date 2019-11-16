import React from 'react';
import AcEditor, { EditorState } from 'ac-editor';
// 引入编辑器样式
import 'ac-editor/dist/index.css';

export default class Editor extends React.Component {

  state = {
      editorState: null
  }

  async componentDidMount () {
    const htmlContent = '<h1>fuck the world</h1>';//await fetchEditorContent()
    this.setState({
      editorState: EditorState.createFrom(htmlContent)
    })
  }

  submitContent = async () => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    const htmlContent = this.state.editorState.toHTML();
    const result = await this.saveEditorContent(htmlContent);
  }

  saveEditorContent=async (html)=>{

  }

  handleEditorChange = (editorState) => {
    this.setState({ editorState });
  }

  render () {
    const { editorState } = this.state;
    return (
      <div className="one-editor">
        <AcEditor
          value={editorState}
          onChange={this.handleEditorChange}
          onSave={this.submitContent}
        />
      </div>
    )
  }

}
