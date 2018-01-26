import { Button, InputItem, List,Flex } from 'antd-mobile';
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { doFetch, doDispatch } from '../../commonActions/fetch';
import { transformCurrency, FormatUtils } from '../../utils/myUtil';
import config from '../../config/config'
import Loading from '../common/Loading';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }



    componentDidMount() {
        

    }


    //优化性能，避免多次重复渲染，只根据关心的数据选择是否渲染,这里比较随意
    // shouldComponentUpdate(nextProps, nextState) {

    //     return (this.props.goodsListObj.goodsList.length != nextProps.goodsListObj.goodsList.length) || (this.props.goodsListObj.pageIndex != nextProps.goodsListObj.pageIndex);
    // }

    // 登录
    ondoLogin(){
        var user = document.getElementById('user').value;
        var pwd = document.getElementById('pwd').value;
        if(user == '' || user == null || user == undefined) return
        if(pwd == '' || pwd == null || pwd == undefined) return

        this.props.doLogin('http://localhost:3001/api/user/signIn.json', 'post', {
            userName: user,
            password: pwd
        })

    }



    render() {
        const { history, loginObj, doLogin } = this.props;
        console.log('^^^^^^^')

        console.log(loginObj)

        if(loginObj.accesstoken != null || loginObj.accesstoken != '' || loginObj.accesstoken != undefined){
            localStorage.setItem("accesstoken",loginObj.accesstoken);
        }

        return (
            <div>

                <List>
                    <InputItem id="user" type="test">账号</InputItem>
                    <InputItem id="pwd"
                        type="password"
                        placeholder="****"
                    >密码</InputItem>
                </List>
                <Button type="primary" onClick={() => this.ondoLogin()}>登录</Button>
                <Flex>
                    <Flex.Item>我要注册</Flex.Item>
                    <Flex.Item>忘记密码</Flex.Item>
                </Flex>
            </div>

        );
    }
}

//关联redux
const LoginRedux = connect((state) => ({
    loginObj: state.loginObj
}), (dispatch) => ({
    doLogin: (url, type, json) => {
        dispatch(doFetch(url, type, json, '_LOGIN'))
      }
}))(Login);

export default LoginRedux;
