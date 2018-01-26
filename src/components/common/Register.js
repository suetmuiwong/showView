import React from 'react';
import { MyNavBarRedux } from './NavBar';
import { connect } from 'react-redux';
import { doFetch, doDispatch } from '../../commonActions/fetch';
import { Button, InputItem, List,Radio } from 'antd-mobile';


class Register extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            userInput: ''
        }
    }

    onRegister(){
        console.log('^^^^^^')
        console.log(this.props)
        // console.log(this.props.form.getFieldProps())
        this.props.doRegister('http://localhost:3001/api/user/signUp.json','post',{
            userName:"test123",
            email:"11584@qq.com",
            password:"123456",
            confirmPassword:"123456",
            agreement:"0"

        })
    }

 
    componentDidUpdate() {
        if (this.props.Register.isLogin) {
            this.props.history.goBack();
        }
    }

    render() {
        const { Register, doRegister, history,registerObj,isFetching } = this.props;
        return (
            <div>
                <MyNavBarRedux history={history} titleName="用户注册" page="LoginPage" />
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
        )
    }
}

//关联redux
const RegisterRedux = connect((state) => ({
    registerObj: state.registerObj
}), (dispatch) => ({
    doRegister: (url, type, json) => {
        dispatch(doFetch(url, type, json, '_REGISTER_LIST'))
      },
}))(Register);

export {RegisterRedux};

//关联redux
// const GoodsListRedux = connect((state) => ({
//     goodsListObj: state.goodsListObj,
//     isFetching: state.isFetching.isFetching
//   }), (dispatch) => ({
//     indexListNextPage: (url, type, json, isFetching) => {
//       dispatch(doFetch(url, type, json, '_GOODS_LIST'))
//     },
//     clearGoodsList: () => {
//       dispatch(doDispatch({}, {}, 'CLEAR_GOODS_LIST'))
//     }
//   }))(GoodsList);
  
//   export { GoodsListRedux }