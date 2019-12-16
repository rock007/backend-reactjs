import * as React from 'react';
import {Panel, Loading } from 'tinper-bee';
import ManService from '../../services/ManService';
import { PageModel } from '../../services/Model/Models';
import UploadFile from '../UploadFile';
import AppConsts from '../../lib/appconst';
import { convertFile } from '../../utils/tools';

interface IPanelProps {
    manId:string
}
interface IPanelState {
    isLoading:boolean,
	record:any,
	relatesPage: PageModel<any>
	worksPage:PageModel<any>
}

export default class ManInfoPanel extends React.Component<IPanelProps,IPanelState> {
    
    state:IPanelState={
        isLoading:true,
		record:{},
		relatesPage:new PageModel<any>(),
		worksPage:new PageModel<any>()
	}
	
	componentWillReceiveProps(nextProps:IPanelProps) {
       
        if (nextProps.manId !== this.props.manId) {

			if(nextProps.manId!=null&&nextProps.manId!=''){
				this.loadData(nextProps.manId);
			}
        }
	}

	loadData=async (id)=>{

        //this.setState({isLoading:true});
		let result = await ManService.findManById(id);
		
		//亲属
		let relatesPage = await ManService.searchRelate({'manId':id});
		//工作
		let worksPage = await ManService.searchWork({'manId':id});

        this.setState({record:result,relatesPage:relatesPage,worksPage:worksPage,isLoading:false});
    }
    render() {
		
		if(this.state.isLoading){

            return ( <Panel><Loading container={this} show={true}/></Panel>)
		}
		
        return ( <div className="form-view">

               <table>
			<tbody><tr>
				<th colSpan={4} style={{textAlign:"left"}}>
					档案基本信息
				</th>
			</tr>		
			<tr>
			<th rowSpan={4} style={{width:"20%"}}>照片</th>
			<td rowSpan={4} style={{width:"30%"}}>
			<div style={{textAlign:'center'}}>

				 <UploadFile defaultFileList={ convertFile(this.state.record.avatar)}  disabled={true}/>
                     	
        	</div>

			</td>
				<th style={{width:"20%"}}>编号</th>
	<td style={{width:"30%"}}>{this.state.record.manNo}</td>
			</tr>
			<tr>
				<th style={{width:"20%"}}>
					姓名
				</th>
				<td style={{width:"30%"}}>
				{this.state.record.realName}
				</td>
			</tr>
			<tr>				
				<th>
					绰号/别名
				</th>
				<td>
				{this.state.record.nickName}
				</td>
			</tr>
			<tr>
				<th>
					性别
				</th>
				<td>
				{this.state.record.sex}
				</td>
			</tr>	
			<tr>
				<th style={{width:"20%"}}>
					民族
				</th>
				<td style={{width:"30%"}}>
				{this.state.record.nation}
				</td>
				<th style={{width:"20%"}}>
					出生日期
				</th>
				<td style={{width:"30%"}}>
				{this.state.record.birthday}
				</td>
			</tr>
		
			<tr>
				<th>
					联系方式
				</th>
				<td>
				{this.state.record.linkPhone}
				</td>
				<th>
					身高(CM)
				</th>
				<td>
				{this.state.record.height}
				</td>
			</tr>
			<tr>
				<th>
					证件种类
				</th>
				<td>
				{this.state.record.idsType}
				</td>
				<th>
					证件号码
				</th>
				<td>
				{this.state.record.idsNo}
				</td>
			</tr>
			
			<tr>
				<th>
					政治面貌
				</th>
				<td>
				{this.state.record.politicalStatus}
				</td>
				<th>
					职业
				</th>
				<td>
				{this.state.record.job}
				</td>
			
			</tr>
			
			<tr>
				<th>
					婚姻状况
				</th>
				<td>
				{this.state.record.marriageStatus}
				</td>
				<th>
					文化程度
				</th>
				<td>
				{this.state.record.educationLevel}
				</td>
			
			</tr>


			<tr>
				<th>
					户籍地
				</th>
				<td>
				{this.state.record.birthplaceDistrict}
				</td>
				<th>
					户籍地派出所
				</th>
				<td>
				{this.state.record.birthplaceRegion}
				</td>
			</tr>
			<tr>
				<th>
					户籍地详址
				</th>
				<td colSpan={3}>
				{this.state.record.birthplaceAddress}
				</td>
			</tr>
			
			<tr>
				<th>
					居住地
				</th>
				<td>
					{this.state.record.liveDistrict}
				</td>
				
				<th>
					居住地派出所
				</th>
				<td>
					{this.state.record.liveRegion}
				</td>
			</tr>
			<tr>
				<th>
					居住地详址
				</th>
				<td colSpan={3}>
				{this.state.record.liveAddress}
				</td>
			</tr>
			
			<tr>
				<th>
					籍贯
				</th>
				<td>
					湖北浠水
					{this.state.record.birthplace}
				</td>
				<th>
					宗教信仰
				</th>
				<td>
				{this.state.record.beliefType}
				</td>
			</tr>
			<tr>
					<th>
						滥用毒品种类
					</th>
					<td colSpan={3}>
					{this.state.record.drugsTypes}
					</td>
			</tr>
				
				<tr>
				<th>
						查获日期
					</th>
					<td>
					{this.state.record.catchDate}
					</td>
					<th>
						查获单位
					</th>
					<td>
					{this.state.record.catchUnit}
					</td>
				</tr>
				<tr>
					<th>
						当前管控状况
					</th>
					<td>
					{this.state.record.controlStatus}
					</td>

					<th>
						当前管控地区
					</th>
					<td>
					{this.state.record.controlPlace}
					</td>
				</tr>
			
		</tbody></table>
        <table>
                <tr>
                <th colSpan={6} style={{textAlign:"left"}}>
					亲属联系人
				</th>
                </tr>
                <tr>
			        <td style={{width:"20%"}}>姓名</td>
			        <td style={{width:"10%"}}>性别</td>
			        <td style={{width:"10%"}}>生日</td>
			        <td style={{width:"10%"}}>关系</td>
			        <td style={{width:"30%"}}>家庭住址</td>
			        <td style={{width:"20%"}}>联系电话</td>
		        </tr>
				{
					this.state.relatesPage.data.map((item,index)=>{

						return (
							<tr>
					<td style={{width:"20%"}}>{item.name}</td>
			        <td style={{width:"10%"}}>{item.sex}</td>
			        <td style={{width:"10%"}}>{item.birthday}</td>
			        <td style={{width:"10%"}}>{item.relationship}</td>
			        <td style={{width:"30%"}}>{item.address}</td>
			        <td style={{width:"20%"}}>{item.phone}</td>
		        </tr>
						)

					})
				}
            </table>
            <table>
                <tr>
                <th colSpan={5} style={{textAlign:"left"}}>
					工作经历
				</th>
                </tr>
                <tr>
			        <td style={{width:"15%"}}>起时</td>
			        <td style={{width:"15%"}}>止时</td>
			        <td style={{width:"20%"}}>职业</td>
			        <td style={{width:"30%"}}>所在单位</td>
			        <td style={{width:"20%"}}>职位</td>
		        </tr>
				{
					this.state.worksPage.data.map((item,index)=>{

						return (
							<tr>
			        <td style={{width:"15%"}}>{item.startDate}</td>
			        <td style={{width:"15%"}}>{item.endDate}</td>
			        <td style={{width:"20%"}}>{item.job}</td>
			        <td style={{width:"30%"}}>{item.company}</td>
			        <td style={{width:"20%"}}>{item.postion}</td>
		        </tr>
						)
					})
				}	
            </table>
        </div >)
    }
}
