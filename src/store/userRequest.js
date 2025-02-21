import {makeAutoObservable} from "mobx"

export default class Request{
    constructor(){
        this.Request=[]
        makeAutoObservable(this)
    }
    setRequest(request){
        this.Request=request
    }
    getRequest(){
        return this.Request
    }
}