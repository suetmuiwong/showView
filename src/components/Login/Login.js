import { Button, InputItem, List, Flex } from 'antd-mobile';
import React from 'react';
import './Login.scss';
import { MyNavBarRedux } from '../common/NavBar';
import md5 from '../../static/md5';
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

    onClickPin() {
        let imgId = document.getElementById('imgId')
        imgId.src = 'http://localhost:9000/shopapi/user/signInPin?' + Math.random();
    }

    // 登录
    onClickLogin() {

        var user = document.getElementById('user').value
        var pwd = document.getElementById('pwd').value
        var pin = document.getElementById('verify').value
        var error_msg = document.getElementById('error_msg');
        var login_msg = document.getElementById('login_msg')

        if (user == '' || user == null || user == undefined) {
            error_msg.style.display = 'block'
            error_msg.innerText = '账号不能为空！'
            return
        }
        if (pwd == '' || pwd == null || pwd == undefined) {
            error_msg.style.display = 'block'
            error_msg.innerText = '密码不能为空！'
            return
        }
        if (pin == '' || pin == null || pin == undefined) {
            error_msg.style.display = 'block'
            error_msg.innerText = '验证码不能为空！'
            return
        }
        error_msg.style.display = 'none'


        this.props.doLogin('http://localhost:9000/shopapi/user/signIn', 'post', {
            userName: user,
            //password: md5(pwd),
            password:pwd,
            pin: pin.replace(/(^\s*)|(\s*$)/g, "")
        })

    }



    render() {
        const { history, loginObj, doLogin } = this.props;

        console.log('^^^^^')
        console.log(loginObj)
     
        if(loginObj.success == 1){
            console.log(loginObj.token)
            localStorage.setItem("token", loginObj.token);
            this.props.history.push("/");
        }
        return (
            <div>
                <MyNavBarRedux history={history} titleName="账号登录" page="LoginPage" />
                <div className="login-wrapper">
                    <div>
                        <div className="item-row">
                            <span className="login-icon icon-user"></span>
                            <span className="login-input">
                                <input id="user" className="input-text" type="text" placeholder="账号" />
                            </span>
                        </div>
                    </div>
                    <div>
                        <div className="item-row">
                            <span className="login-icon icon-pwd"></span>
                            <span className="login-input">
                                <input id="pwd" className="input-text" type="password" placeholder="密码" />
                            </span>
                        </div>
                    </div>
                    <div>
                        <div className="item-row-verify">
                            <span className="item-verify">
                                <span className="login-icon icon-verify"></span>
                                <span className="login-input-verity">
                                    <input id="verify" className="input-verify" type="text" placeholder="验证码" />
                                </span>
                            </span>
                            <span className="verify-img">
                                <img src="http://localhost:9000/shopapi/user/signInPin" alt="图片" id='imgId' onClick={() => this.onClickPin()} />
                            </span>
                        </div>
                    </div>
                    <div id="error_msg" className='error-msg'></div>
                    <p className="item-row-btn" onClick={() => this.onClickLogin()} >
                        <button id="loginBtn" className="submit-btn">登录</button>
                    </p>
                    <div id="login_msg" className='login-msg'></div>
                </div>

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
