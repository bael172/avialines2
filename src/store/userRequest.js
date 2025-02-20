import {makeAutoObservable} from "mobx"

export default class UserRequest{
    constructor(){
        this.userRequest=[]
        makeAutoObservable(this)
    }
    setUserRequest(request){
        this.userRequest=request
    }
    getUserRequest(){
        return this.userRequest
    }
}