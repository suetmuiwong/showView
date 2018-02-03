import { Route, Link } from 'react-router-dom'
import { render } from 'react-dom';
import React from 'react';
import 'normalize.css';
import './index.scss';
import 'flex.css/dist/data-flex.css';
import { Provider } from 'react-redux';
import FastClick from './utils/fastclick';
FastClick.attach(document.body);
import store from './store'
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { GoodsListRedux } from './components/Goods/GoodsList';
import GoodsDetailRedux from './components/Goods/GoodsDetail';
import OrdersListRedux from './components/Order/OrdersList';
import OrderDetailRedux from './components/Order/OrderDetail';
import OrderPayedRedux from './components/Order/OrderPayed';

import config from './config/config';
import Bundle from './utils/bundle';

import AppLocale from './languageProvider/index';

// 内容国际化支持
//如果浏览器没有自带intl，则需要在使用npm安装intl之后添加如下代码
import intl from 'intl';
import { addLocaleData, IntlProvider, FormattedMessage, injectIntl } from 'react-intl'; //导入国际化语言配置文件
// 内容国际化
//import zh from 'react-intl/locale-data/zh';
//import en from 'react-intl/locale-data/en';


// ant 组件的国际化支持
import { LocaleProvider } from 'antd-mobile';


// 内容国际化-自定义语言文件
//import zh_CN from './locale/zh_CN';
//import en_US from './locale/en_US';


// import zh_CN from './languages/zh_CN';
// import en_US from './languages/en_US';




const Router = config.Router; //路由配置


// const languages = navigator.languages;
// const currentLang = languages[0];

// console.log(currentLang)

console.log(AppLocale)


/*
*messages是render()时IntlProvider组件所传的props，属性名固定：messages；
*messages返回值为映射表，比如：'react-intl/locale-data/zh'&&'./locale/zh_CN'；
*/
// let messages = {};
// messages["en-US"] = en_US;
// messages["zh-CN"] = zh_CN;


// console.log(messages)
// console.log(enUS)
/*
*获取浏览器设置的语言；
*按设置，返回["zh-CN", "zh", "en-US", "en"]，排序与语言设置顺序一直；
*/

// const languages = navigator.languages;
// const currentLang = languages[0];

//addLocaleData([...zh, ...en]); //载入语言数据


// console.log(currentLang)



// var lang = ['zh', 'en'];

// localStorage.setItem("lang", JSON.stringify(lang));

// var newlang = localStorage.getItem("lang");
// // console.log(newlang)
// // console.log(JSON.parse(newlang));  

// var currentLang = JSON.parse(newlang);
// //console.log('^^^^^')
// console.log(currentLang[1])


//let basicInfo = localStorage.getItem("loginInfo");
// console.log('666')
// console.log(basicInfo)
// let loginLang = JSON.parse(basicInfo).goods_language;
// console.log(loginLang)

let currentLang = 'zh'




const currentAppLocale = AppLocale[currentLang];
console.log(currentAppLocale)
console.log(currentAppLocale.antd)

//const currentAppLocale = AppLocale['en']; //临时改成英文版界面测试

// console.log(currentAppLocale.antd)
// console.log(currentAppLocale.antd.Picker)




render(
    (
        <LocaleProvider locale={currentAppLocale.antd}>
            <IntlProvider
                locale={currentAppLocale.locale}
                messages={currentAppLocale.messages}
                formats={currentAppLocale.formats}

            >
                <Provider store={store}>
                    {/*如果路径不对，请修改basename为你想要的，或者直接删除basename属性*/}
                    {/*<Router basename="/react-t">*/}
                    <Router>
                        <div style={{ width: '100%', height: '100%' }} >
                            <Route path="/Login" component={Login} />
                            <Route path="/Register" component={Register} />
                            <Route exact path="/" component={GoodsListRedux} />
                            <Route path="/goodsDetail/:id" component={GoodsDetailRedux} />
                            <Route path="/ordersList" component={OrdersListRedux} />
                            <Route path="/orderDetail/:id" component={OrderDetailRedux} />
                            <Route path="/orderPayed/:id" component={OrderPayedRedux} />
                        </div>
                    </Router>
                </Provider>
            </IntlProvider>
        </LocaleProvider>
    ), document.getElementById('app')
);















