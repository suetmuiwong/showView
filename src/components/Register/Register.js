import { Button, InputItem, List,Radio } from 'antd-mobile';
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

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }



    componentDidMount() {
  
        this.props.doRegister('http://localhost:3001/api/user/signUp.json','post',{
            userName:"test1234",
            email:"115842@qq.com",
            password:"123456",
            confirmPassword:"123456",
            agreement:"0"

        })

    }


    //优化性能，避免多次重复渲染，只根据关心的数据选择是否渲染,这里比较随意
    // shouldComponentUpdate(nextProps, nextState) {

    //     return (this.props.goodsListObj.goodsList.length != nextProps.goodsListObj.goodsList.length) || (this.props.goodsListObj.pageIndex != nextProps.goodsListObj.pageIndex);
    // }



    render() {
        const { history, registerObj, doRegister } = this.props;

        return (
            <div>
                <List>
                    <InputItem id="re-userName">用户名：</InputItem>
                    <InputItem id="re-email"> 邮箱地址：</InputItem>
                    <InputItem id="re-password"
                        // {...getFieldProps('password') }
                        type="password"
                        placeholder="****"
                    >密码：</InputItem>
                     <InputItem id="re-confirmPassword"
                        // {...getFieldProps('confirmPassword') }
                        type="password"
                        placeholder="****"
                    >确认密码：</InputItem>
                </List>
                <Radio onChange={e => console.log('checkbox', e)}>我已阅读xxx协议</Radio>
                <Button type="primary" onClick={() => this.onRegister()}>确定</Button>
            </div>
        );
    }
}

//关联redux
const RegisterRedux = connect((state) => ({
    registerObj: state.registerObj
}), (dispatch) => ({
    doRegister: (url, type, json) => {
        dispatch(doFetch(url, type, json, '_LOGIN'))
      }
}))(Register);

export default RegisterRedux;
