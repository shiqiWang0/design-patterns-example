export const Factory = function (type:string, content:string) {
    if (this instanceof Factory) {
        const s = new (this as any)[type](content);
        return s;
    } else {
        return new (Factory as any)(type,content)
    }
}

Factory.prototype = {
    Java: function (content) {},
    Javascript: function (content) {},
    // 每次增加添加一个属性来完成创建
}
