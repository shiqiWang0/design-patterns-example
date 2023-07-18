// 函数定义一个模拟类
export const Book = function (id:number, name: string, price: number) {
    // 私有属性
    const num = 1;
    // 私有方法
    // function checkId () {}
    // 特权方法
    this.getName = function () {}
    // 对象公有的属性
    this.id = id;
    // 对象公有方法
    this.copy = function(){console.log(num)}
    //构造器
    // this.setName(name) // 构造器 控制台报错？
}

// 当 new 关键字实例化对象时， 执行了一遍类的函数，所以里面通过调用特权方法自然可以处事话对象的一些属性

// 类的静态共有属性 类的静态共有方法
Book.hasChinese = true
Book.getList = function () {}


Book.prototype = {
    // 公有属性
    isJsBook: false,
    // 公有方法
    display : function () {}
}

const b = new (Book as any)(11,"javascript",50)

console.log(b.num) // undefined
console.log(b.isJsBook); // false
console.log(b.id) // 11
console.log(b.hasChinese) // undefined

console.log(b.__proto__, Book.prototype, b.__proto__ === Book.prototype)
console.log(b.__proto__,Book,b)
// console.error(b.proptotype)


// 闭包是有权访问另一个函数作用域中变量的函数

// 继承
// 1. 类式继承， 原型链继承
function SuperClass () {
    this.superValue = true
}
SuperClass.prototype.getSuperValue = function (){return this.superValue}

function SubClass () {
    this.subValue = false
}

SubClass.prototype = new (SuperClass as any)()
SubClass.prototype.getSubValue = function () {return this.subValue}

const hhh = new (SubClass as any)()
console.log(hhh.getSuperValue())
console.log(hhh.getSubValue())
console.log(SubClass.prototype,SuperClass.prototype)

// 2. 构造函数继承

function SuperClass2 (id:number){
    this.books = ['js','html','css'];
    this.id = id;
}
 SuperClass2.prototype.showBooks = function () {
    console.log("superClass2", this.books)
 }

 function SubClass2 (id:number) {
    SuperClass2.call(this,id) // 将父类的内容全部执行一遍， 没有复用效果，但是可以传递参数给父类
 }

 const instance1 = new (SubClass2 as any)(10);
 const instance2 = new (SubClass2 as any)(11);

 instance1.books.push('实例1')
 console.log(instance1.books);
 console.log(instance2.books);
 console.log(instance1.id);
 console.log(instance2.id);
//  instance1.showBooks() // TypeError

 // 组合继承
 // 类式继承【原型链继承】： 通过子类的原型prototype 对父类实例化来实现 :: 父类的共有属性互相污染 && 不能传递参数
 // 构造函数式继承： 通过在子类的构造函数作用环境中执行一次父类的构造函数来实现 ::  每个实例单独维护自己的属性 && 但是无法继承原型上的方法

 function SuperClass3 (name:string) {
    this.name = name; // 值共有
    this.books = ['js','html,',"父类三"] // 引用类型共用
 }
 SuperClass3.prototype.getName = function(){
    console.log(this.name);
 }
 function SubClass3 (name:string, age: number) {
    SuperClass3.call(this,name)
    this.age = age;
 }
 SubClass3.prototype = new (SuperClass3 as any)();

 SubClass3.prototype.getAge = function () {
    console.log(this.age)
 }

 const  instance3 = new (SubClass3 as any)('lili',22);
 instance3.books.push('jhhhh');
 console.log(instance3.books)
 instance3.getName();
 instance3.getAge();

 const  instance4 = new (SubClass3 as any)('hhhh',28);
 console.log(instance4.books)
 instance4.getName();
 instance4.getAge();

 // 寄生式继承

 function inheritObject (o:any) {
    // 创建一个过渡函数对象
    function F() { }
    F.prototype = o;
    return new (F as any)()
}

const book = {
   name: 'js book',
   alikeBook : ['css', 'js']
}

function createBook (obj: any) {
   const o = new (inheritObject as any)(obj);
   console.log(o)
   o.getName = function () {
       console.log(this.name)
   }
   return o;
}
console.log('-------')
const anotherBook = createBook(book);
anotherBook.getName()

 // 寄生组合式继承： 构造函数 && 寄生继承 （寄生继承依托于原型继承 ， 原型继承又是与类式继承雷同）

 function inheritPrototype (subClass:any, superClass:any) {
    // 复制一份父类的原型副本保存在变量中
    const p = inheritObject(superClass.prototype);
    p.constructor = subClass
    subClass.prototype = p;
 }

 function SuperClass4 (name:string) {
    this.name = name;
    this.colors = ['red','blue','green']
 }
 SuperClass4.prototype.getName = function () {
    console.log(this.name)
 }

 function SubClass4 (name: string, age: number) {
    SuperClass4.call(this,name);
    this.age = age
 }

 inheritPrototype(SubClass4,SuperClass4);

 SubClass4.prototype.getAge = function (){
    console.log(this.age)
 }

 const ins1 = new (SubClass4 as any)('jj',12);
 const ins2 = new (SubClass4 as any)('hgs',36);

 ins1.colors.push('black');
 console.log('****')
 console.log(ins1.colors)
 console.log(ins2.colors);
 ins2.getName()
 ins2.getAge()

