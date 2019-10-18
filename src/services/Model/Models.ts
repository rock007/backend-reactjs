
export  class JsonBody<T> {

    result: number = 0;
    msg: number=0;
  
    data:T;
  }
  
export  class PageModel<T>{

    pageIndex:number;// 索引

	pageSize:number;// 每页显示条数

	totalPage:number;// 总页数

	dataCount:number;// 总记录数
	
	data:T;
}  
