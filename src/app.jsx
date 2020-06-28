import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import './app.scss'
import './plugins/taroui/custom-variables.scss' // 全局引入taro-ui的样式文件,并自定义主题
import './assets/fonts/iconfont.css' // 引入iconfont的字体库
/* eslint-disable import/first */
import 'taro-parse/dist/style/main.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  config = {
    pages: [
      'pages/index/index',
      'pages/talks/index',
      'pages/about/index',
      'pages/articledetail/index',
      'pages/noveldetail/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#dbdbdb',
      selectedColor: '#1296db',
      backgroundColor: '#fafafa',
      list: [
        {
          pagePath: 'pages/index/index',
          text: '首页',
          iconPath: './assets/images/home.png',
          selectedIconPath: './assets/images/homeSelected.png'
        },
        {
          pagePath: 'pages/talks/index',
          text: '说说',
          iconPath: './assets/images/talk.png',
          selectedIconPath: './assets/images/talkSelected.png'
        },
        {
          pagePath: 'pages/about/index',
          text: '关于我',
          iconPath: './assets/images/me.png',
          selectedIconPath: './assets/images/meSelected.png'
        }
      ]
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
