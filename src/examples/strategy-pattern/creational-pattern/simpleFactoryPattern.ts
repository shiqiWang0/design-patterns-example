function createBall(text:string) {
    const o = new Object();
    (o as any).content = text;
    (o as any).show = function(){}
    return o;
}

function BasketBall() {
    // 继承createBall父类
    const o = new (createBall as any)('nihao');
    console.log(o)
    o.popBasket = function () {
        console.log(this.content)
    }
    return o
}

function Football() {
    // 继承createBall父类
    const o = new (createBall as any)('llll');
    console.log(o)
    o.clickFootball = function () {
        console.log(this.content)
    }
    return o;
}

export function SportsFactory (name: string) {
    switch (name) {
        case "NBA":
            return new (BasketBall as any)();
        case "hhh":
            return new (Football as any)();
        default :
            return null
    }

}

const a = SportsFactory('NBA');
a.popBasket()
a.content = "aaa"
a.popBasket()
const b = SportsFactory('hhh');
b.clickFootball()
