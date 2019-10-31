
export  class JsonBody<T> {

    result: number = 0;
    msg: string='网络错误';
  
    data:T;
  }
  
export  class PageModel<T>{

  pageIndex:number=1;// 索引

	pageSize:number=20;// 每页显示条数

	totalPage:number=1;// 总页数

	dataCount:number=0;// 总记录数
	
	public data:T[]=[];
}  

export interface ITreeNode{
  key:string
  title:string
  disabled?:boolean
  selectable?:boolean
  children?:ITreeNode[]
}

export interface SearchModel{

  //社区部门
  orgId?:string

  orgIdSelected?:string
  //身份证号
  idsNo?:string
  //姓名
  manName?:string
  //联系电话
  linkPhone?:string
  //性别
  sex?:string
  //人员类别
  cateType?:string
  //风险等级
  level?:number
  //网格
  gridId?:string
  //创建时间(区间)
  beginDate?:string
  endDate?:string

  //排序
  orderBy?:string
}