import cloneDeep from 'clone-deep';
import {ITreeNode} from '../services/Model/Models';
import AppConsts from "../lib/appconst";
import defaultPic from '../images/pic_holder.png';

export function isMoment(obj){
    return typeof obj === 'object' && obj.date && obj.format;
}

export function formatRefPath(refPath){
    if(!refPath || typeof refPath !== 'string'){
        return refPath;
    }
    if(refPath[0] === '/'){
        refPath = refPath.slice(1);
    }
    if(refPath[refPath.length-1] === '/'){
        refPath = refPath.slice(0,-1);
    }
    return refPath;
}

export function isRef(any){
    let str = String(any);
    return str.indexOf('refname') > -1 && str.indexOf('refpk') > -1 && str[0] == '{' && str[str.length-1] == '}';
}

export function isDate(any){
    return Object.prototype.toString.call(any) === '[object Date]';
}

export function handleRef(any){
    try{
        any = JSON.parse(any)['refpk'];
    }
    catch(err){
        console.log('handle ref error');
        console.log(err);
    }

    return any;
}

export function handleMoment(any){
    any = any.format('YYYY-MM-DD hh:mm:ss');

    return any;
}

export function handleEntity(entity){
    for(let p in entity){
        if(entity.hasOwnProperty(p)){
            let val = entity[p];
            if(isRef(val)){
                entity[p] = handleRef(val);
            }
            else if(isMoment(val)){
                entity[p] = handleMoment(val);
            }
        }
    }

    return entity;
}

function isString(str){ 
    return (typeof str=='string')&&str.constructor==String; 
} 

export function getValidateFieldsTrim(values) {
    for (const key in values) {
        if (values.hasOwnProperty(key)) {
            const element = values[key];
            if(isString(element)){
                values[key] = (values[key]).trim();
            }
        }
    }
    return values;
}

// 深度拷贝
export function deepClone(data) {
    return cloneDeep(data);
}

export function convertOrgTreeNode(item:any):ITreeNode{

    let obj={
        id:item.id,
        key:item.id,
        title:item.deptName,
        disabled:false,
        selectable:true
    };
    
    if(item['childs']!=null&&item['childs'].length>0){

        obj['children']=[];
        for (const element of item['childs']) {
            
           let one=  convertOrgTreeNode(element);

           obj['children'].push(one);
        }
    }

    return obj;
}

export function convertAreaTreeNode(item:any):ITreeNode{

    let obj={
        id:item.id,
        key:item.id,
        title:item.areaName,
        disabled:false,
        selectable:true,
        //ext:item,
    };
    
    if(item['childs']!=null&&item['childs'].length>0){

        obj['children']=[];
        for (const element of item['childs']) {
            
           let one=  convertAreaTreeNode(element);

           obj['children'].push(one);
        }
    }

    return obj;
}



export function convertMenuTreeNode(item:any):ITreeNode{

    let obj={
        id:item.id,
        key:item.id,
        title:item.name,
        disabled:false,
        selectable:true,
        isLeaf:true,
        //ext:item,
    };
    
    if(item['childs']!=null&&item['childs'].length>0){

        obj['children']=[];
        obj.isLeaf=false;
        for (const element of item['childs']) {
            
           let one=  convertMenuTreeNode(element);

           obj['children'].push(one);
        }
    }

    return obj;
}


export function convertArticleCateTreeNode(item:any):ITreeNode{

    let obj={
        id:item.cateId,
        key:item.cateId,
        title:item.title,
        disabled:false,
        selectable:true
    };
    
    if(item['childs']!=null&&item['childs'].length>0){

        obj['children']=[];
        for (const element of item['childs']) {
            
           let one=  convertArticleCateTreeNode(element);

           obj['children'].push(one);
        }
    }

    return obj;
}


export function convertFiles(list:Array<any>):Array<any>{

    if(list==null) return [];
    
    const files= list.map((item,index)=>{

        return {
            uid:  item.fileId ||item.id,
            name: item.fileName,
            //status: 'done',
            url:  AppConsts.uploadUrl+item.fileUrl,
            thumbUrl:AppConsts.uploadUrl+item.fileUrl
            //response:item,
            //url: 'https://p0.ssl.qhimgs4.com/t010e11ecf2cbfe5fd2.png',
            //thumbUrl: 'https://p0.ssl.qhimgs4.com/t010e11ecf2cbfe5fd2.png',
        }
    });

    return files;
}


export function convertFile(fileUrl:string):Array<any>{

    let now=new Date().getUTCSeconds();

    if(fileUrl==null||fileUrl==='') return [{uid:now,name:'img_'+now,url:defaultPic,thumbUrl:defaultPic}];
     

    return [{
            uid:  now,
            name: 'img_'+now,
            //status: 'done',
            url:  AppConsts.uploadUrl+fileUrl,
            thumbUrl:AppConsts.uploadUrl+fileUrl
            //response:item,
            //url: 'https://p0.ssl.qhimgs4.com/t010e11ecf2cbfe5fd2.png',
            //thumbUrl: 'https://p0.ssl.qhimgs4.com/t010e11ecf2cbfe5fd2.png',
        }];
}

export function  convertLevelText(m):string{

    if(m==1) return '低风险';
    if(m==2) return '中风险';
    if(m==3) return '高风险';
    if(m==0) return '无风险';
    return m;
}

export function  convertCardTypeText(m):string{
    if(m==null) return '';
    if(m==1) return '黄牌';
    if(m==2) return '红牌';

    if(m==0) return '预警';
    return m;
}

export function  convertWarnTypeText(m):string{
    if(m==null) return '';
    if(m==0) return '未知';
    if(m==1) return '社区未报到';
    if(m==2) return '尿检阳性';
    if(m==3) return '拒绝检查';
    if(m==4) return '失联';
    if(m==5) return '其它';
    
    return m;
}


export function  convertBussModifyTypeText(m):string{
    if(m==null) return '';
    if(m==0) return '未知';
    if(m==1) return '转移社区';
    if(m==2) return '修改人员分类';
    if(m==3) return '修改风险等级';
    if(m==4) return '修改所属网格';
    if(m==5) return '修改报到时间';
    
    return m;
}

export function  convertBussTypeText(m):string{
    if(m==null) return '';
    if(m==0) return '未知';
    if(m==1) return '系统';
    if(m==2) return '档案';
    if(m==3) return '告诫书';
    if(m==4) return '通知函';
    if(m==5) return '尿检';
    if(m==6) return '走访';
    if(m==7) return '请假';
    if(m==8) return '社戒';
    if(m==9) return '求助';

    return m;
}

export function  convertContactManTypeText(m):string{
    if(m==null) return '';
    if(m==0) return '未知';
    if(m==1) return '主任';
    if(m==2) return '(村/社区)责任人';
    if(m==3) return '家庭成员及其监护人（担保人）';
    if(m==4) return '专（兼）职社工';
    if(m==5) return '社区民警';
    if(m==6) return '社区医护人员';
    if(m==7) return '社区网格员';
    if(m==8) return '禁毒志愿者';
    
    return m;
}


export function openPage(url:string):Window{
    let strWindowFeatures = `
        menubar=yes,
        location=yes,
        resizable=yes,
        scrollbars=yes,
        status=yes
    `;

    let winName:string="win_"+new Date().getUTCSeconds();

    return window.open(AppConsts.remoteServiceBaseUrl+"/web/"+url, winName,  strWindowFeatures);
}