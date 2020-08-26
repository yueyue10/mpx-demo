# mpx-demo

使用滴滴的[MPX框架][1]开发的多平台小程序项目

## 项目特点

* 代码风格和`VUE`相似，在一个mpx文件中就可以处理一个界面的代码逻辑
* 具体js方法和页面布局控件和`微信小程序`写法一致
* 使用`npm run watch`等编译命令后在`小程序开发工具`里面就可以自动刷新

## 项目配置

#### 1.小程序项目配置
在`static`目录下的各小程序文件夹中配置对应平台的参数
```
本项目只发布到的字节跳动平台
在static/tt目录下的配置文件中配置了
"appid"和"projectname"
```
#### 2.项目运行配置
在`package.json`中配置`watch:cross`命令对应的小程序平台
#### 3.小程序代码模块
* 1.页面注册
    > 在`src/app.mpx`中添加页面路径
* 2.网络请求
    > 在`src/libs/httputils.js`中编写网络请求方法

    使用微信小程序的`wx.request`网络请求方法，`wx.showLoading`显示加载进度框
* 3.页面编写
    > 在`src/pages/`下添加页面的`mpx`文件并编写
    
## 小程序页面代码编写
#### 1.页面配置
-原小程序的`json`文件中的代码
```
<script name="json">
    module.exports = {
        navigationBarTitleText: '诗词古文'
    }
</script>
```
#### 2.方法编写
-原小程序的`js`文件中的代码

> 在`<script>`标签中，先引入`createPage`和`getRequest`方法
```
import { createPage } from '@mpxjs/core'
import { getRequest, postRequest } from '../../../libs/httputils'
```
> 再执行`createPage`方法，并编写页面逻辑方法
```
createPage({
        data: {
            poetry: {}
        },
        onLoad(options) {
            let title = decodeURIComponent(options.title)
            let flag = decodeURIComponent(options.flag)
            wx.setNavigationBarTitle({
                title: title
            })
            this.getGradePoetry(flag)
        },
        onShareAppMessage(shareOption) {
           //这个是小程序分享所需的方法
        },
        methods: {
            getGradePoetry(poetryFlag) {
                getRequest('/poetry/list/byFlag', { poetryFlag }).then(res => {
                    let poetryList = res.results
                    console.log('poetryList', poetryList)
                    poetryList.forEach(poetry => {
                        poetry.content = JSON.parse(poetry.content)
                    })
                    this.poetryList = poetryList
                }, err => {
                    console.error(err)
                })
            }
        }
    })
```
#### 3.页面布局编写
-原小程序的`wxml`文件中的代码

> 在`<template>`标签中编写布局代码
```
<view class="container">
    <view class="chapterName">{{bookInfo.title}}</view>
    <view wx:for="{{bookInfo.paragraphs}}" wx:key="*this">
      <text class="paragraphs">{{item}}</text>
    </view>
</view>
```
#### 4.页面样式编写
-原小程序的`wxss`文件中的代码

> 在`<style scoped>`标签中编写样式代码
```
@import "../../libs/weui.wxss";

  .poetry-grid {
    width: 90%;
    margin: 10px 5%;
    border-top: 1px;
    border-left: 1px;
  }
```



[1]:https://didi.github.io/mpx/
