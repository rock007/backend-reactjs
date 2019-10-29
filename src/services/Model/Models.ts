
export  class JsonBody<T> {

    result: number = 0;
    msg: number=0;
  
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