import React from 'react';
import { MyNavBarRedux } from './NavBar';
import { connect } from 'react-redux';
import doFetch from '../../commonActions/fetch';
import { Button, InputItem, List,Flex } from 'antd-mobile';
import { createForm } from 'rc-form';

class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            userInput: ''
        }
    }

    onInputChange(val) {
        this.setState({
            userInput: val
        })
    }

    componentDidUpdate() {
        if (this.props.loginObj.isLogin) {
            this.props.history.goBack();
        }
    }

    ondoLogin(){
        this.props.doLogin('http://localhost:3001/api/user/signIn.json','post',{
            userName:"test123",
            email:"11584@qq.com",
            password:"123456",
            confirmPassword:"123456",
            agreement:"0"

        })


    }

    render() {
        const { loginObj, doLogin, history } = this.props;
        const { getFieldProps } = this.props.form;
        return (
            <div>
                <MyNavBarRedux history={history} titleName="用户登录" page="LoginPage" />
                <List>
                    <InputItem>账号</InputItem>
                    <InputItem
                        {...getFieldProps('password') }
                        type="password"
                        placeholder="****"
                    >密码</InputItem>
                </List>
                <Button type="primary" onClick={() => this.ondoLogin()}>登录</Button>
                <Flex>
                    <Flex.Item>我要注册</Flex.Item>
                    <Flex.Item>忘记密码</Flex.Item>
                </Flex>

{/* 
                <List renderHeader={() => '获取Accesstoken方法：CNode登录=>设置=>最下方'}>
                    <InputItem
                        {...getFieldProps('input3') }
                        placeholder="Accesstoken"
                        autoFocus
                        onChange={(val) => this.onInputChange(val)}
                        value={this.state.userInput}
                    />
                </List>
                <Button className="toLoginPage" onClick={() => doLogin(this.state.userInput)}>登录</Button> */}
            </div>
        )
    }
}

const LoginRedux = connect((state) => ({
    loginObj: state.loginObj
}), (dispatch) => ({
    doLogin: (url, type, json) => {
        dispatch(doFetch(url, type, json, '_LOGIN'))
      }
}))(Login);

const LoginReduxWrapper = createForm()(LoginRedux);

export default LoginReduxWrapper;