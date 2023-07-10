interface RuleItem {
    strategy: string;
    errMsg: string;
}

type StrategiesKey = "isNonEmpty" |"minLength"|"isMoblie"|"isEmail"


class Validator {
    cache:any[]
    constructor() {
        this.cache = []
    }
    strategies = {
        isNonEmpty:(value:string, errorMsg:string)=> {
            return value === '' ?
                errorMsg : void 0
        },
        minLength:(value:string, length:number, errorMsg:string) =>{
            return value?.length < length ?
                errorMsg : void 0
        },
        isMoblie:(value:string, errorMsg:string)=> {
            return !/^1(3|5|7|8|9)[0-9]{9}$/.test(value) ?
                errorMsg : void 0
        },
        isEmail:(value:string, errorMsg:string)=> {
            return !/^\w+([+-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value) ?
                errorMsg : void 0
        }
    }
    add (value: any,rules:RuleItem[]) {
        rules.forEach(rule => {
            let strategyArr = rule.strategy.split(':') || []
            const errMsg = rule.errMsg;
            this.cache.push(() => {
                let strategy:StrategiesKey = strategyArr.shift() as StrategiesKey;
                strategyArr.unshift(value)
                strategyArr.push(errMsg)

            // apply 第二个参数为 函数的执行函数的参数list 进行传递
            return (this.strategies[strategy] as any)?.apply(this,strategyArr)

            })
        })
    }
    start() {
        // for ...in 与for ...of 与foreach 的区别是，forEach 按照上面的写法是无法跳出循环的，可以通过 throw error 配合try catch实现
        for(let validatorFunc of this.cache) {
            let errMsg = validatorFunc();
            if(errMsg) return errMsg
        }

    }
}
export default Validator
