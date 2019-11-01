import * as React from 'react';
import {Panel, Tabs,Tile,Icon,Select, FormControl,Row, Col,Label,Form,Radio, Breadcrumb } from 'tinper-bee';

interface IPanelProps {
    param?:any
}
interface IPanelState {
    expanded:boolean,
    current:any,
    selectedkey:any
}

export default class ManInfoBussPanel extends React.Component<IPanelProps,IPanelState> {
    
    state:IPanelState={
        expanded:false,
        current:null,
        selectedkey:null
    }
    componentDidMount() {

    }
    render() {
        
        return ( <div className="form-view">
            
               <table>
			<tbody><tr>
				<th colSpan={4} style={{textAlign:"left"}}>
					档案基本信息
				</th>
			</tr>		
			<tr>
			<th rowSpan={4} style={{width:"20%"}}></th>
			<td rowSpan={4} style={{width:"30%"}}>
				44444	
			</td>
				<th style={{width:"20%"}}>编号</th>
				<td style={{width:"30%"}}></td>
			</tr>
			<tr>
				<th style={{width:"20%"}}>
					姓名
				</th>
				<td style={{width:"30%"}}>
					李守明
				</td>
			</tr>
			<tr>				
				<th>
					绰号/别名
				</th>
				<td>
					
				</td>
			</tr>
			<tr>
				<th>
					性别
				</th>
				<td>
					
				</td>
			</tr>	
			<tr>
				<th style={{width:"20%"}}>
					民族
				</th>
				<td style={{width:"30%"}}>
					汉
				</td>
				<th style={{width:"20%"}}>
					出生日期
				</th>
				<td style={{width:"30%"}}>
					1969-02-18
				</td>
			</tr>
		
			<tr>
				<th>
					联系方式
				</th>
				<td>
					18771087871
				</td>
				<th>
					身高(CM)
				</th>
				<td>
					
				</td>
			</tr>
			<tr>
				<th>
					证件种类
				</th>
				<td>
					身份证
				</td>
				<th>
					证件号码
				</th>
				<td>
					421125196902181357
				</td>
			</tr>
			
			<tr>
				<th>
					政治面貌
				</th>
				<td>
					群众
				</td>
				<th>
					职业
				</th>
				<td>
					
				</td>
			
			</tr>
			
			<tr>
				<th>
					婚姻状况
				</th>
				<td>
					
				</td>
				<th>
					文化程度
				</th>
				<td>
					
				</td>
			
			</tr>


			<tr>
				<th>
					户籍地
				</th>
				<td>
					湖北省浠水县巴河镇碧峰村
				</td>
				<th>
					户籍地派出所
				</th>
				<td>
					巴河水陆派出所
				</td>
			</tr>
			<tr>
				<th>
					户籍地详址
				</th>
				<td colSpan={3}>
					湖北省黄冈市浠水县巴河镇碧峰村十一组
				</td>
			</tr>
			
			<tr>
				<th>
					居住地
				</th>
				<td>
					湖北省浠水县巴河镇碧峰村
				</td>
				
				<th>
					居住地派出所
				</th>
				<td>
					巴河水陆派出所
				</td>
			</tr>
			<tr>
				<th>
					居住地详址
				</th>
				<td colSpan={3}>
					湖北省黄冈市浠水县巴河镇碧峰村十一组
				</td>
			</tr>
			
			<tr>
				<th>
					籍贯
				</th>
				<td>
					湖北浠水
				</td>
				<th>
					宗教信仰
				</th>
				<td>
					
				</td>
			</tr>
			<tr>
					<th>
						滥用毒品种类
					</th>
					<td colSpan={3}>
						甲基安非他命
					</td>
			</tr>
				
				<tr>
				<th>
						查获日期
					</th>
					<td>
						
					</td>
					<th>
						查获单位
					</th>
					<td>
						
					</td>
				</tr>
				<tr>
					<th>
						当前管控状况
					</th>
					<td>
						社区戒毒
					</td>

					<th>
						当前管控地区
					</th>
					<td>
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
			        <td style={{width:"10%"}}>年龄</td>
			        <td style={{width:"10%"}}>关系</td>
			        <td style={{width:"30%"}}>家庭住址</td>
			        <td style={{width:"20%"}}>联系电话</td>
		        </tr>

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

            </table>
        </div >)
    }
}
