export const VehicleFactory = function (subType:string, superType:string) {
    // 判断抽象工厂中是否有该抽象类
    if (typeof (VehicleFactory as any)[superType] === 'function') {
        function F(){}
        F.prototype = new (VehicleFactory as any)[superType]();
        subType.constructor = subType;
        subType.proptotype = new (F as any)()
    } else {
        throw new Error('未创建该抽象类')
    }
}
// 小汽车抽象类
VehicleFactory.Car = function () {
    this.type = "car"
}
VehicleFactory.Car.prototype = {
    getPrice: function () {
        return new Error('抽象方法不能调用')
    },
    getSpeed: function (){
        return new Error('抽象方法不能调用')
    }
}
// 宝马实例

const BMW = function (price:number,speed: number) {
    this.price = price;
    this.speed = speed;
}
BMW.prototype.getSpeed = function () {
    return this.speed
}
BMW.prototype.getPrice = function () {
    return this.price
}

// 测试
const car = new (BMW as any)(20,10)

console.log(car.getPrice())
console.log(car.type)
