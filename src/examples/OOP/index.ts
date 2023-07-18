
// 定义了三个全局参数
export const checkPhone = () => {

}

export const checkEmail = () => {

}

export const checkName = () => {

}
// 改用一个对象进行封装，避免三个全局变量被覆盖的概率

const checkObject = {
    checkPhone:() =>{},
    checkEmail:() => {},
    checkName: () => {}
}

// 如果其他人想要用checkObject.下面的方法，要进行对象的复制

const CheckObjectCopy = () => {
    return checkObject
}
const a = CheckObjectCopy();
a.checkEmail()

//上述 a 的创建与 CheckObject 没有任何关系
// Es6 之前，用函数 + 原型链的方式 模拟定义类

const CheckObjectCopy2 = function () {
    this.checkEmail = function() { console.log('check')}
    this.checkName = function () {}
    this.checkPhone = function () {}
}

const b = new (CheckObjectCopy2 as any)();
b.checkEmail()

// 这样每次创一个实例，该实例下面都有一套check的方法，这样会造成不必要的消耗

const CheckObjectCopy3 = function(){};

CheckObjectCopy3.prototype = {
    checkName: function() {},
    checkEmail: function() {},
    checkPhone: function() {}
}

const c = new (CheckObjectCopy3 as any)();
c.checkEmail()
c.checkName()
c.checkPhone()

// 可以看出调用了三个放大，而且实例对象c 写了三遍，那可以如下改造

const CheckObjectCopy4 = function() {}

CheckObjectCopy4.prototype = {
    checkName: function() { return this},
    checkEmail: function() {return this},
    checkPhone: function() {return this}
}

const d = new ( CheckObjectCopy4 as any)()
// d.checkEmail().checkPhone().checkName()

// 如果想给每一个函数都添加一个检测对象的方法可以这样做

// eslint-disable-next-line no-extend-native
// (Function.prototype as any).checkEmail = function(){}

// 这样的方式污染了 Function 原型
