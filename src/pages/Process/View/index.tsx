import * as React from 'react';
import {Panel, PageLayout,Navbar,Icon,Select,Tile, PanelGroup,Tabs,Row, Col,Label,Form,Radio, Breadcrumb } from 'tinper-bee';

import Grid from "bee-complex-grid";
import 'bee-complex-grid/build/Grid.css';

import {FormList ,FormListItem}from '../../../components/FormList';
import SearchPanel from '../../../components/SearchPanel';

import {deepClone, mergeListObj, delListObj,getValidateFieldsTrim} from "../../../utils";

import moment from "moment";
import PopDialog from '../../../components/Pop';
import FormError from '../../../components/FormError';
import {RefWalsinLevel, RefIuapDept} from '../../../components/RefViews'

import DatePicker from "bee-datepicker";
import SelectMonth from '../../../components/SelectMonth';
import zhCN from "rc-calendar/lib/locale/zh_CN";

import InputNumber from 'bee-input-number';
import Calendar from 'bee-calendar';

import './index.scss';
import { flow } from 'mobx';

const FormItem = FormListItem;
const {Option} = Select;

interface IPageProps {
    
}
interface IPageState {
    btnFlag:number,
    rowData:any,
    activeKey:any,
    type:string
}

const {YearPicker} = DatePicker;
const format = "YYYY-MM-DD HH:mm:ss";
const formatYYYY = "YYYY";
let titleArr = ["新增", "修改", "详情"];


class ProcessViewPop extends React.Component<any,IPageState> {
    
    state:IPageState={
        btnFlag:0,
        rowData:{},
        activeKey:{},
        type:'month'
    }
    
    componentWillReceiveProps(nextProps) {
        let _this = this;
        let {btnFlag, currentIndex} = this.props;
        let {btnFlag: nextBtnFlag, currentIndex: nextCurrentIndex, editModelVisible} = nextProps;
        // 判断是否 btnFlag新弹框状态  currentIndex当前选中行
        if (btnFlag !== nextBtnFlag || currentIndex !== nextCurrentIndex) {
            _this.props.form.resetFields();
            // 防止网络阻塞造成btnFlag显示不正常
            this.setState({btnFlag: nextBtnFlag}); 
            if (nextBtnFlag !== 0 && editModelVisible) {
                let {list} = this.props;
                let rowData = list[nextCurrentIndex] || {};
                this.setState({rowData});
            }
        }

    }
    componentDidMount() {

    }

    handleSelect(activeKey) {
        this.setState({activeKey:activeKey});
    }
     /**
     * 关闭Modal
     */
    onCloseEdit = () => {
        this.setState({rowData: {}, btnFlag: 0});
        this.props.onCloseEdit();
    }

    /**
     * 提交表单信息
     */
    onSubmitEdit = () => {
        let _this = this;
        let {btnFlag}=_this.state;
        _this.props.form.validateFields((err, _values) => {
            let values = getValidateFieldsTrim(_values);
            if (!err) {
                values = _this.onHandleSaveData(values);
                this.onCloseEdit();
                values.btnFlag=btnFlag; // 弹框状态标识
            //    actions.popupEdit.saveOrder(values);
            }
        } );
    }

    /**
     *
     * @description 处理保存数据
     * @param {Object} values 待处理数据
     */
    onHandleSaveData = (values) => {
        let _this = this,
            {rowData} = this.state,
            resObj = {} as any;

        if (rowData) {
            resObj = Object.assign({}, rowData, values);
        }
        resObj.year = resObj.year.format(formatYYYY);
        //修改状态日期格式化
        if(resObj.applyTime){
            resObj.applyTime=resObj.applyTime.format(format);
        }
        _this.onHandleRef(resObj);
        return resObj;
    }

    onHandleRef = (values) => {
        let arr = ['dept', 'postLevel'];
        for (let i = 0, len = arr.length; i < len; i++) {
            let item = JSON.parse(values[arr[i]]);
            values[arr[i]] = item['refpk'];
        }
    }

    /**
     *
     * @description 底部按钮是否显示处理函数
     * @param {Number} btnFlag 为页面标识
     * @returns footer中的底部按钮
     */
    onHandleBtns = (btnFlag) => {
        let _this = this;
        let btns = [

            {
                label: '取消',
                fun: this.onCloseEdit,
                shape: 'border'
            },
            {
                label: '确定',
                fun: _this.onSubmitEdit,
                colors: 'primary'
            },
        ];

        if (btnFlag == 2) {
            btns = [];
        }
        return btns;
    }

    onTypeChange(type) {
        this.setState({
            type,
        });
    }
   
    render() {
        
        const _this = this;
        let {form, isShow} = _this.props;
        let {rowData, btnFlag} = _this.state;
        let {getFieldProps, getFieldError} = form;
        let {
            code, serviceYearsCompany, pickTime,
            postLevel, levelName, year, sex, allowanceStandard, remark,
            deptName, dept, exdeeds, allowanceActual,
            allowanceType, month, pickType, name,
            serviceYears, applyTime
        } = rowData;

        // console.log('rowData', allowanceStandard);
        let btns = _this.onHandleBtns(btnFlag);

        return (   <PopDialog
            show={isShow}
            title={titleArr[btnFlag]}
            size='xlg'
            autoFocus={false}
            enforceFocus={false}
            close={this.onCloseEdit}
            className="process-all-view-pop"
        ><Row>
            <Col md={5} className="form-view">
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
        <table >
			<tbody><tr>
				<th colSpan={4} style={{textAlign:"left"}}>
					执行信息
				</th>
			</tr>	
			<tr>
				<th>
					报到社区:
				</th>
				<td>
					清泉镇中心戒毒社区
				</td>
				<th>
					报到时间
				</th>
				<td>
					2018-07-11
				</td>
			</tr>
			<tr>
				<th>
					网格单元
				</th>
				<td>
					清泉镇
				</td>
				<th>
					网格员
				</th>
				<td>
					
				</td>
			</tr>
			<tr>
					
				<th>人员分类</th>
				<td>
					社区戒毒
				</td>
				<th>风险级别</th>
				<td>
					
					
						中风险
					
					
					
		
				</td>	
			</tr>
		</tbody></table>

            <table>
                <tr>
                <th colSpan={4} style={{textAlign:"left"}}>
					六保一联系人
				</th>
                </tr>

            </table>
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
            </Col>
            <Col md={7} style={{paddingLeft:'20px'}}>
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab='概览' key="1">
                        <ul style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
                            <li>
                                <Tile style={{width:80,height:80,margin:"5px",padding:"3px"}}>
				                    <h4>尿检</h4>
				                    <span>190/12</span>
			                    </Tile>
                            </li>
                            <li>
                                <Tile style={{width:80,height:80,margin:"5px",padding:"3px"}}>
				                    <h4>走访</h4>
				                    <span>120</span>
			                    </Tile>
                            </li>
                            <li>
                                <Tile style={{width:80,height:80,margin:"5px",padding:"3px"}}>
				                    <h4>签到</h4>
				                    <span>120</span>
			                    </Tile>
                            </li>
                            <li>
                                <Tile style={{width:80,height:80,margin:"5px",padding:"3px"}}>
				                    <h4>请假</h4>
				                    <span>120</span>
			                    </Tile>
                            </li>
                            <li>
                                <Tile style={{width:80,height:80,margin:"5px",padding:"3px"}}>
				                    <h4>求助</h4>
				                    <span>120</span>
			                    </Tile>
                            </li>
                        </ul>
                        <table >
		<tr>
			<td style={{width:"20%"}}>类型</td>
			<td style={{width:"80%"}}>附件</td>
		</tr>
		<tr>
			<td>社区戒毒协议书</td>
			<td>
			   		
	 					<div id="file_182" className="qq-upload-button" style={{float:"left",marginTop:"8px",marginLeft:"10px"}}>	
    						<img alt="" src="http://219.138.141.28:10005/jiedu2/upfiles//2019-08-21/b9d45b9ac1234e4f82aa51bcd5b767f8.jpg" style={{width:"77px",height:"77px"}}/>
    					</div>	
	 				
			</td>
		</tr>
		<tr>
			<td>
				担保书
			</td>
			<td>
					
	 					<div id="file_183" className="qq-upload-button" style={{float:"left",marginTop:"8px",marginLeft:"10px"}}>	
    						<img alt="" src="http://219.138.141.28:10005/jiedu2/upfiles//2019-08-21/762404c77ced4c7997365b6d04dc2cb6.jpg" style={{width:"77px",height:"77px"}}/>
    					</div>	
	 							
			</td>

		</tr>
		<tr>
				<td>社区康复决定书</td>
				<td>
				 <div id="holder_2">
    					
	 					<div id="file_1375" className="qq-upload-button" style={{float:"left",marginTop:"8px",marginLeft:"10px"}}>	
    						<img alt="" src="http://219.138.141.28:10005/jiedu2/upfiles//2019-10-12/992765e9e58444258b44fee9724645ca.jpg" style={{width:"77px",height:"77px"}} />
    					</div>	
    					   
	    		 </div>
	    						
				</td>
		</tr>
		<tr>
				<td>人员分类审批表</td>
				<td>
				 <div id="holder_2">
    					
			   		
    					   
	    		 </div>
	    						
				</td>
		</tr>
	</table>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='尿检记录' key="2">
                        <span>第一年</span>
                        <div style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
                                <div className="block-view">
				                    <span>2019-01-01</span>
				                    <span>阴性</span>
			                    </div>
                                <div className="block-view">
				                    <span>2019-01-01</span>
				                    <span>阴性</span>
			                    </div>
                                <div className="block-view">
				                    <span>2019-01-01</span>
				                    <span>阴性</span>
			                    </div>
                                <div className="block-view">
				                    <span>2019-01-01</span>
				                    <span>阴性</span>
			                    </div>
                                <div className="block-view">
				                    <span>2019-01-01</span>
				                    <span>阴性</span>
			                    </div>
                                <div className="block-view">
				                    <span>2019-01-01</span>
				                    <span>阴性</span>
			                    </div>
                                <div className="block-view">
				                    <span>2019-01-01</span>
				                    <span>阴性</span>
			                    </div>
                                <div className="block-view">
				                    <span>2019-01-01</span>
				                    <span>阴性</span>
			                    </div>
                                <div className="block-view">
				                    <span>2019-01-01</span>
				                    <span>阴性</span>
			                    </div>
                                <div className="block-view">
				                    <span>2019-01-01</span>
				                    <span>阴性</span>
			                    </div>
                                <div className="block-view">
				                    <span>2019-01-01</span>
				                    <span>阴性</span>
			                    </div>
                                <div className="block-view">
				                    <span>2019-01-01</span>
				                    <span>阴性</span>
			                    </div>
                        </div>
                        <span>第二年</span>
                        <div style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
                                <div className="block-view">
				                    <span>2019-01-01</span>
				                    <span>阴性</span>
			                    </div>
                                <div className="block-view">
				                    <span>2019-01-01</span>
				                    <span>阴性</span>
			                    </div>
                                <div className="block-view">
				                    <span>2019-01-01</span>
				                    <span>阴性</span>
			                    </div>
                                <div className="block-view">
				                    <span>2019-01-01</span>
				                    <span>阴性</span>
			                    </div>
                                <div className="block-view">
				                    <span>2019-01-01</span>
				                    <span>阴性</span>
			                    </div>
                                <div className="block-view">
				                    <span>2019-01-01</span>
				                    <span>阴性</span>
			                    </div>
                        </div>
                        <span>第三年</span>
                        <div style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
                                <div className="block-view">
				                    <span>2019-01-01</span>
				                    <span>阴性</span>
			                    </div>
                                <div className="block-view">
				                    <span>2019-01-01</span>
				                    <span>阴性</span>
			                    </div>
                                <div className="block-view">
				                    <span>2019-01-01</span>
				                    <span>阴性</span>
			                    </div>
                        </div>
                        <span>随机尿检</span>
                        <div style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
                                <div className="block-view">
				                    <span>2019-01-01</span>
				                    <span>阴性</span>
			                    </div>
                                <div className="block-view">
				                    <span>2019-01-01</span>
				                    <span>阴性</span>
			                    </div>
                                <div className="block-view">
				                    <span>2019-01-01</span>
				                    <span>阴性</span>
			                    </div>
                        </div>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='走访记录' key="3">Content of Tab Pane 3</Tabs.TabPane>
                    <Tabs.TabPane tab='签到' key="4">Content of Tab Pane 3
                    <Calendar
                   style={{ margin: 10 }}
                   fullscreen

                   onSelect={()=>{}}
                   type={this.state.type}
                   onTypeChange={this.onTypeChange.bind(this)}

               />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='请假' key="5">Content of Tab Pane 3</Tabs.TabPane>
                    <Tabs.TabPane tab='求助' key="6">Content of Tab Pane 3</Tabs.TabPane>
                </Tabs>
            </Col>
            </Row>

        </PopDialog>)
    }
}

export default Form.createForm()(ProcessViewPop);