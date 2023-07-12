interface Validator {
    userName:(params:any)=> any,
    password:(params:any)=> any,
    phoneNumber:(params:any)=> any,
    email:(params:any)=> any,
}
type ValidatorType = keyof Validator

type ErrorMsg = {
    [type in keyof Validator]: string
}

const validator = function (target:any,validator:Validator, errorMsg:ErrorMsg){
    return new Proxy(target, {
        set(target,key:ValidatorType,value:string,proxy){
            let errMsg = errorMsg;
            if(value === "" ) {
                alert(`${errMsg[key]}不能为空`)
                target[key] = value
                return false
            }
            let validate = validator[key]
            if(!!validate(value)) {
                return Reflect.set(target,key,value,proxy)
            }
            alert(`${errMsg[key]}格式不符合`)
            target[key] = value
            return false
        }
    })
}

export default validator
