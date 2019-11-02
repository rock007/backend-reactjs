import cloneDeep from 'clone-deep';
import {ITreeNode} from '../services/Model/Models';

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
        title:item.disName,
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