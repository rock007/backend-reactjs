
import http from './httpService';
import AppConsts from '../lib/appconst';
const qs = require('qs');

class CmsService {
  
  //查询文章
  public async searchArticle(args:any,pageIndex:number=1,pageSize:number=20): Promise<any> {
    let result = await http.post('/rest/cms/article-search',args,{params:{pageIndex:pageIndex,pageSize:pageSize}});
    return result;
  }
  
  public async submitArticle(args:any): Promise<any> {
    let result = await http.post('/rest/cms/article-submit',args);
    return result;
  }
  public async findArticleById(id:string): Promise<any> {
    let result = await http.get('/rest/cms/article-get',{params:{id:id,uid:AppConsts.session.userId}});
    return result;
  }
  
  public async deleteArticleByIds(ids:string): Promise<any> {
    let result = await http.get('/rest/cms/article-delete',{params:{ids:ids}});
    return result;
  }

  //查询分类
  public async searchCate(args:any,pageIndex:number=1,pageSize:number=20): Promise<any> {
    let result = await http.post('/rest/cms/cate-search',args,{params:{pageIndex:pageIndex,pageSize:pageSize}});
    return result;
  }
  public async submitCate(args:any): Promise<any> {
    let result = await http.post('/rest/cms/cate-submit',args);
    return result;
  }
  public async findCateById(id:string): Promise<any> {
    let result = await http.get('/rest/cms/cate-get',{params:{id:id}});
    return result;
  }
  
  public async deleteCateByIds(ids:string): Promise<any> {
    let result = await http.get('/rest/cms/cate-delete',{params:{ids:ids}});
    return result;
  }
  public async getArticleCateTree(): Promise<any> {
   
    let result = await http.get('/rest/cms/getArticeCateTree');
    return result;
  }

}

export default new CmsService();
