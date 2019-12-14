import cloneDeep from 'clone-deep';
import {ITreeNode} from '../services/Model/Models';
import AppConsts from "../lib/appconst";

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


export function convertFiles(list):Array<any>{

    if(list==null) return [];
     
    const files= list.map((item,index)=>{

        return {
            uid:  item.fileId,
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
