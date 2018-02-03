import { Button, InputItem, List,Radio } from 'antd-mobile';
import React from 'react';
import './Register.scss';
import md5 from '../../static/md5';
import { MyNavBarRedux } from '../common/NavBar';
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



class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }



    componentDidMount() {
  
     

    }

    onBlurEmail(){
        var email = document.getElementById('regemail').value
        var error_msg = document.getElementById('regerror_msg');

        if (email == '' || email == null || email == undefined) {
            error_msg.style.display = 'block'
            error_msg.innerText = '邮箱不能为空！'
            return
        }
        var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/; 
        if ( ! re.test(email)) {
            error_msg.style.display = 'block'
            error_msg.innerText = '邮箱格式不对！'
            return
        } else{
            error_msg.style.display = 'none'
        }


    }

    onRegister() {

        
        var user = document.getElementById('reguser').value
        var email = document.getElementById('regemail').value
        var fpwd = document.getElementById('regpwd').value
        var pwd = document.getElementById('regrepwd').value
        var error_msg = document.getElementById('regerror_msg');
     
        var regRegister_msg = document.getElementById('regRegister_msg')

        if (user == '' || user == null || user == undefined) {
            error_msg.style.display = 'block'
            error_msg.innerText = '账号不能为空！'
            return
        }
        if (email == '' || email == null || email == undefined) {
            error_msg.style.display = 'block'
            error_msg.innerText = '邮箱不能为空！'
            return
        }
    
        if (fpwd == '' || fpwd == null || fpwd == undefined) {
            error_msg.style.display = 'block'
            error_msg.innerText = '密码不能为空！'
            return
        }
        if (pwd == '' || pwd == null || pwd == undefined) {
            error_msg.style.display = 'block'
            error_msg.innerText = '再次确认密码不能为空！'
            return
        }
        if(pwd != fpwd){
            error_msg.style.display = 'block'
            error_msg.innerText = '两次输入的密码不一致！'
            return
        }
      
        error_msg.style.display = 'none'
        let self = this;

        this.props.doRegister('http://localhost:3001/api/user/signUp.json','post',{
            userName:user,
            email:email,
            password:md5(pwd),
     
        }, function () {
            self.props.history.push("/Login");
        })

      



    }


    //优化性能，避免多次重复渲染，只根据关心的数据选择是否渲染,这里比较随意
    // shouldComponentUpdate(nextProps, nextState) {

    //     return (this.props.goodsListObj.goodsList.length != nextProps.goodsListObj.goodsList.length) || (this.props.goodsListObj.pageIndex != nextProps.goodsListObj.pageIndex);
    // }



    render() {
        const { history, registerObj, doRegister } = this.props;

        
        if(registerObj.isRegister ){
            this.props.history.push("/Login");
        }

        return (
            <div>
                <MyNavBarRedux history={history} titleName="注册账号" page="LoginPage" />
                <div className="login-wrapper">
                    <div>
                        <div className="item-row">
                            <span className="login-icon icon-user"></span>
                            <span className="login-input">
                                <input id="reguser" className="input-text" type="text" placeholder="用户名" />
                            </span>
                        </div>
                    </div>
                    <div>
                        <div className="item-row">
                            <span className="login-icon icon-email"></span>
                            <span className="login-input">
                                <input id="regemail" className="input-text" type="text" placeholder="邮箱地址" onBlur={() => this.onBlurEmail()}   />
                            </span>
                        </div>
                    </div>
                    <div>
                        <div className="item-row">
                            <span className="login-icon icon-pwd"></span>
                            <span className="login-input">
                                <input id="regpwd" className="input-text" type="password" placeholder="密码" />
                            </span>
                        </div>
                    </div>
                    <div>
                        <div className="item-row">
                            <span className="login-icon icon-pwd"></span>
                            <span className="login-input">
                                <input id="regrepwd" className="input-text" type="password" placeholder="确认密码" />
                            </span>
                        </div>
                    </div>
  
                    <div id="regerror_msg" className='error-msg'></div>
                    <p className="item-row-btn" onClick={() => this.onRegister()} >
                        <button id="regloginBtn" className="submit-btn">注册</button>
                    </p>
                    <div id="regRegister_msg" className='login-msg'></div>
                </div>

            </div>

        );
    }
}

//关联redux
const RegisterRedux = connect((state) => ({
    registerObj: state.registerObj
}), (dispatch) => ({
    doRegister: (url, type, json) => {
        dispatch(doFetch(url, type, json, '_REGISTER'))
      }
}))(Register);

export default RegisterRedux;


