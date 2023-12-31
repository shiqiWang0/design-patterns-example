import { Form,Input,Button } from 'antd';
// import Validator from './validator'
import Validator from './validatorProxy';
const { Item: FormItem}  = Form;
const validators = {
    userName(value:string) {
        return value?.length > 6
    },
    password(value:string) {
        return value?.length > 6
    },
    phoneNumber(value:string) {
        return /^1(3|5|7|8|9)[0-9]{9}$/.test(value)
    },
    email(value:string) {
        return /^\w+([+-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)
    }
}
const errMsg = {
    userName: '用户名', password: '密码', phoneNumber: '手机号码', email: '邮箱地址'
}
const StrategyForm = () => {
    const [form] = Form.useForm();

    // const validatorFunc = (values:any) => {
    //     const { userName, password, phoneNumber, email } = values
    //     const validator = new Validator();
    //     validator.add(userName,[
    //         {
    //             strategy:"isNonEmpty" ,
    //             errMsg: '用户名不能为空！'

    //         },{
    //             strategy:"minLength:6" ,
    //             errMsg: '用户名长度不能小于6位！'
    //         }
    //     ])
    //     validator.add(password,[
    //         {
    //             strategy:"isNonEmpty" ,
    //             errMsg: '密码不能为空！'

    //         },{
    //             strategy:"minLength:6" ,
    //             errMsg: '密码长度不能小于6位！'
    //         }
    //     ])
    //     validator.add(phoneNumber,[
    //         {
    //             strategy:"isNonEmpty" ,
    //             errMsg: '手机号码不能为空！'

    //         },{
    //             strategy:"isMoblie" ,
    //             errMsg: '手机号码格式不正确！'
    //         }
    //     ])
    //     validator.add(email,[
    //         {
    //             strategy:"isNonEmpty" ,
    //             errMsg: '用户名不能为空！'

    //         },{
    //             strategy:"isEmail" ,
    //             errMsg: '邮箱地址格式不正确！'
    //         }
    //     ])
    //     let errMsg = validator.start()
    //     return errMsg
    // }

    const onFinish = (values:any) => {
        // 使用策略模式实现
        // const errMsg = validatorFunc(values)
        // if(errMsg) {
        //     alert(errMsg)
        // } else {
        //     alert('提交成功')
        //     console.log(values)
        // }

        // 常规想到的可以实现提交之前做的校验工作
        // if (userName === '') {
        //     alert('用户名不能为空！')
        //     return false
        // }
        // if (userName.length < 6) {
        //     alert('用户名长度不能少于6位！')
        //     return false
        // }
        // if (password === '') {
        //     alert('密码不能为空！')
        //     return false
        // }
        // if (password.length < 6) {
        //     alert('密码长度不能少于6位！')
        //     return false
        // }
        // if (phoneNumber === '') {
        //     alert('手机号码不能为空！')
        //     return false
        // }
        // if (!/^1(3|5|7|8|9)[0-9]{9}$/.test(phoneNumber)) {
        //     alert('手机号码格式不正确！')
        //     return false
        // }
        // if (email === '') {
        //     alert('邮箱地址不能为空！')
        //     return false
        // }
        // if (!/^\w+([+-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)) {
        //     alert('邮箱地址格式不正确！')
        //     return false
        // }
        // alert('提交成功')

        // 使用proxy 代理实现
        const vali = Validator({},validators,errMsg)
        let validatorNext = function * () {
            yield vali.userName = values.userName
            yield vali.password = values.password
            yield vali.phoneNumber = values.phoneNumber
            yield vali.email = values.email
        }
        let validator = validatorNext();
        validator.next()
        !vali.userName || validator.next(); //上一步的校验通过才执行下一步
        !vali.password || validator.next();
        !vali.phoneNumber || validator.next();
        alert('提交成功')
    }



    return (
        <>
            <h1>strategy pattern example</h1>
            <Form form={form} name='form' onFinish={onFinish}>
                <FormItem label="用户名" name='userName'>
                    <Input></Input>
                </FormItem>
                <FormItem label="密码" name='password'>
                    <Input.Password></Input.Password>
                </FormItem>
                <FormItem label="电话" name='phoneNumber'>
                    <Input></Input>
                </FormItem>
                <FormItem label="邮箱" name='email'>
                    <Input></Input>
                </FormItem>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>

            </Form>
        </>
    )
}
export default StrategyForm
