import './index.scss';

import * as React from 'react';

import {Icon,Upload} from 'tinper-bee';
import AppConsts from '../../lib/appconst';

interface IUploadInfo{
  uid: string,      // 唯一性id
  name: string      // 文件名
  status?: 'uploading'| 'done'| 'error'| 'removed',  // 参数：uploading, done, error, removed
  response?: any, 
  url?:string,
  thumbUrl?:string
}

interface IPanelProps {
  uploadChange?:(list:Array<any>,from:string)=>void
  defaultFileList:Array<any>,
  from?:string,
  disabled:boolean
}

interface IPanelSate {
  fileList:Array<any>
}

export default class UploadFile extends React.Component<IPanelProps,IPanelSate> {

  static defaultProps = {
    disabled: false,
    defaultFileList:[]
  }

  //state:IPanelSate={
  //  fileList:[]
  //}

  constructor(props) {
    super(props);

    this.state = {
      fileList: this.props.defaultFileList 
    };
  }

 
  componentWillReceiveProps(nextProps:IPanelProps) {

    if(nextProps.defaultFileList!=this.props.defaultFileList){

      this.setState({fileList:nextProps.defaultFileList});
    }
  }
 /** 
  shouldComponentUpdate(nextProps,nextState){
    
    if(nextState.defaultFileList!=this.state.defaultFileList){

      return true;
    }
  }
  ***/

  notifyFilesChange=(list)=>{

    const oo= list.map((m,i)=>{

      return m.response.result==1? m.response.data[0]:m.response.msg;
    });

    if(this.props.uploadChange){
      this.props.uploadChange(oo,this.props.from);
    }
  }
  handler_onChange=(info)=>{
   
    console.log('upload status:'+info.file.status);
    if (info.file.status === 'uploading') {
      //console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      console.log(`${info.file.name} file uploaded successfully`);
     
      if(this.props.uploadChange){
        this.notifyFilesChange(info.fileList);
      } 
    } else if (info.file.status === 'error') {
      console.log(`${info.file.name} file upload failed.`);
      Error('${info.file.name}图片上传失败了');
    } else if(info.file.status==='removed'){
      console.log(`${info.file.name} file is removed.`);
        this.notifyFilesChange(info.fileList);
    }

  }

  render() {

    
const demo2props = {
  action: '/upload.do',
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file);
      console.log(info.fileList);
    }
  },
  defaultFileList: [{
    uid: -1,
    name: 'xxx.png',
    status: 'done',
    url: 'http://www.baidu.com/xxx.png',
  }, {
    uid: -2,
    name: 'yyy.png',
    status: 'done',
    url: 'http://www.baidu.com/yyy.png',
  }],
};

const uploadProps={action: AppConsts.remoteServiceBaseUrl+'/web/rest/file/upload',
headers:{
    Authorization: 'Bearer '+AppConsts.authorization.token
  },
disabled:this.props.disabled,
name:'files',
listType:'picture-card',
defaultFileList: this.props.defaultFileList,//no defaultFileList see source fileList
onChange:this.handler_onChange
};

    return (
      <div>
        <Upload {...uploadProps}>

              {this.props.disabled?null:(
              <React.Fragment>
                <Icon type="uf-plus" style={{fontSize:'22px'}}/> 
                <p>上传</p>
              </React.Fragment>
              )}

        </Upload>
         {JSON.stringify(this.state.fileList)}
      </div>
    );
  }
}

/*
{
          this.props.defaultFileList==null?null:this.props.defaultFileList.map((item,index)=>{

            //console.log('defaultFileList:'+JSON.stringify(item));
            return (<img key={item.uid} id="image" width={60} height={60} src='http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-1-min.jpg' alt="Picture"/>)
                
          })
        }
*/