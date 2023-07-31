//商店：Director指挥者类
function KFCShop() {
    this.construct = function(builder:any) {
        builder.step1();
        builder.step2();
        return builder.get();
}}
//汉堡包制作：建造者类
function HamburgerBuilder() {
    this.bread = null;
    this.step1 = function() {
        this.bread = new (Hamburger as any)();
    };
    this.step2 = function() {
        this.bread.addQuantity();
    };
    this.get = function() {
        return this.bread;
    };
}
//薯条制作：建造者类
function FrenchFriesBuilder() {
    this.fries = null;
    this.step1 = function() {
        this.fries = new (FrenchFries as any)();
    };
    this.step2 = function() {
        this.fries.addQuantity();
    };
    this.get = function() {
        return this.fries;
    };
}
//产品类：汉堡包
function Hamburger() {
    this.quantity = 1;
    this.addQuantity = function() {
        this.quantity = 6;
    };
    this.say = function() {
        log.add("我要" + this.quantity + "个汉堡包！");
    };
}
//产品类：薯条
function FrenchFries() {
    this.quantity = 1;
    this.addQuantity = function() {
        this.quantity = 2;
    };
    this.say = function() {
        log.add("我要" + this.quantity + "份薯条！");
    };
}
// 日志打印
var log = (function() {
    var log = "";
    return {
        add: function(msg:any) {
            log += msg + "\n";
        },
        show: function() {
            alert(log);
            log = "";
        }
    }
 })();
//运行程序
function run() {
    var shop = new (KFCShop as any)();
    var hamBuilder = new (HamburgerBuilder as any)();
    var friesBuilder = new (FrenchFriesBuilder as any)();
    //顾客通过向商店下订不同的饮食套餐，得到不同的美食
    var hamburgerOrder = shop.construct(hamBuilder);
    var friesOrder = shop.construct(friesBuilder);
    hamburgerOrder.say();
    friesOrder.say();
    log.show();
 }
 run();
