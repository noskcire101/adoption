import {useEffect, useState} from 'react';


function getSavedValue(key:any, initialValue:any){
        const savedValue = JSON.parse(localStorage.getItem(key) as any)
    if(savedValue) return savedValue
    if(initialValue instanceof Function) return initialValue()
    return initialValue
}
export default function useLocalStorage(key:any, initialValue:any){
    const [value,setValue] = useState(()=>{
        return getSavedValue(key,initialValue)
    })
    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(value))
    },[value])
    return[value,setValue];
}