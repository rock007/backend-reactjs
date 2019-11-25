import './index.scss';

import * as React from 'react';

import { Avatar, Col, Icon, Row, Menu ,Upload} from 'tinper-bee';
import AppConsts from '../../lib/appconst';

interface IUploadInfo{
  uid: string,      // 唯一性id
  name: string      // 文件名
  status: 'uploading'| 'done'| 'error'| 'removed',  // 参数：uploading, done, error, removed
  response?: any, 
  url?:string,
  thumbUrl?:string
}

interface IPanelProps {

}

interface IPanelSate {

  data:Array<IUploadInfo>
}

export default class UploadFile extends React.Component<IPanelProps,IPanelSate> {

  state:IPanelSate={
    data:[{
      uid: '-2',
      name: 'zzz.png',
      status: 'done',
      url: 'https://p0.ssl.qhimgs4.com/t010e11ecf2cbfe5fd2.png',
      thumbUrl: 'https://p0.ssl.qhimgs4.com/t010e11ecf2cbfe5fd2.png',
    }]
  }
  componentDidMount() {

  }

  handler_onchange=(info)=>{
    debugger;
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      console.log(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      console.log(`${info.file.name} file upload failed.`);
    }

  }
  render() {

    const demo4props = {
      action: AppConsts.remoteServiceBaseUrl+'/web/rest/file/upload',
      headers: {
          Authorization: 'Bearer '+AppConsts.authorization.token,
      },
      name: 'files',
      onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            console.log(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            console.log(`${info.file.name} file upload failed.`);
          }
      },
      listType: 'picture-card',
      defaultFileList: this.state.data,
    };
  
    return (
      <div>
        <Upload action= {AppConsts.remoteServiceBaseUrl+'/web/rest/file/upload'}
              headers= {{
                  Authorization: 'Bearer '+AppConsts.authorization.token
                }
              }
            name='files'
            listType='picture-card'
            fileList= {this.state.data}
            onChange={this.handler_onchange}>
            <Icon type="uf-plus" style={{fontSize:'22px'}}/> 
              <p>上传</p>
        </Upload>
      </div>
    );
  }
}

