import './index.scss';

import * as React from 'react';

import { Avatar, Col, Icon, Row, Menu ,Upload} from 'tinper-bee';
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
  uploadChange:(list:Array<any>,from:string)=>void
  defaultFileList?:Array<any>,
  from?:string
}

interface IPanelSate {

  data:Array<IUploadInfo>
}

export default class UploadFile extends React.Component<IPanelProps,IPanelSate> {

  state:IPanelSate={
    data:[{
      uid: '-2',
      name: 'zzz.png',
      //status: 'done',
      url: 'https://p0.ssl.qhimgs4.com/t010e11ecf2cbfe5fd2.png',
      //thumbUrl: 'https://p0.ssl.qhimgs4.com/t010e11ecf2cbfe5fd2.png',
    }]
  }
  notifyFilesChange=(list)=>{

    const oo= list.map((m,i)=>{

      return m.response.result==1? m.response.data[0]:m.response.msg;
    });

    if(this.props){
      this.props.uploadChange(oo,this.props.from);
    }
  }
  handler_onChange=(info)=>{
   
    if (info.file.status === 'uploading') {
      console.log(info.file, info.fileList);
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
  handler_onRemove=(file)=>{

    return true;
  }

  render() {

    return (
      <div>
        <Upload action= {AppConsts.remoteServiceBaseUrl+'/web/rest/file/upload'}
              headers= {{
                  Authorization: 'Bearer '+AppConsts.authorization.token
                }
              }
              name='files'
              listType='picture-card'
              defaultFileList= {this.props.defaultFileList||[]}
              onChange={this.handler_onChange}
              onRemove={this.handler_onRemove}
              >
              <Icon type="uf-plus" style={{fontSize:'22px'}}/> 
              <p>上传</p>
        </Upload>
      </div>
    );
  }
}

