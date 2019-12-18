
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

export class PopPageModel{

    title:string='详细'
    url:string='/nofound'
    permission?:string

    size?:'sm'|'lg'|"xlg"

    constructor(title?:string,url?:string){

      this.title=title;
      this.url=url;
    }

}

export interface LocationModel{

  id?:string

  locationX:number
  locationY:number
  locationZ?:number

  locationSn?:string  
  location?:string
  from?:string

  createDate?:string
}

//列表页 page属性
export  interface IPageCommProps {
  form:any,
  history:any,
  match:any,
}

export interface IPageCommState {
  isLoading:boolean
}


export interface IListPageState {
  page:PageModel<any>,
  isLoading:boolean,
  checkedRows:Array<any>,

  pageModel: PopPageModel,
  isPopPage:boolean,

  isDeleteAlterShow:boolean
}

//详细页
export interface IPageDetailProps {
  form:any,
  //in page
  history:any,
  match:any,

  //in pop
  isPage?:boolean,
  url?:string,
  handlerBack?:(flag:number)=>void
}
export interface IPageDetailState {
  isLoading:boolean,
  record:any,
}

