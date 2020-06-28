import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text } from "@tarojs/components";
import { AtAvatar } from 'taro-ui'
import marked from 'marked'
import TaroParser from 'taro-parse'
import { servicePath } from '../../config/apiBaseUrl'
import './index.scss'
import bloger from '../../config/blog'
import { formatTime } from '../../lib/tools'

const Index = ()=>{
  const title = '关于我'
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: true,
    smartLists: true,
    smartypants: false,
    sanitize:false
  });

  const [ aboutContent, setAboutContent ] = useState('')
  const [ publishTime, setPublishTime ] = useState('')
  const [ userInfo, setUserInfo ] = useState('')

  const getUserInfo = ()=>{
    Taro.showLoading({
      title: '加载中...'
    })
    Taro.request({
      method: 'get',
      url: servicePath.getUserInfoById + bloger.id
    })
      .then(res=>{
        Taro.hideLoading()
        const result = res.data
        if (result.success) {
          setUserInfo(result.data)
        }
      })
  }

  const getAbout = ()=>{
    Taro.request({
      method: 'get',
      url: servicePath.getAbout
    })
      .then(res=>{
        const result = res.data
        if (result.success) {
          setAboutContent(result.data.content)
          setPublishTime(formatTime(result.data.updatetime * 1000, 'yyyy-MM-dd'))
        }
      })
  }

  useEffect(()=>{
    Taro.setNavigationBarTitle({
      title: title
    });
    getUserInfo()
    getAbout()
  }, [])

  return (
    <View className='about'>
      <View className='user'>
        <AtAvatar className='portrait' circle image={userInfo.portrait} size='large'></AtAvatar>
        <View className='sub-info'>
          <Text className='username'>{userInfo.username}</Text>
          <View  className='account-info'>
            <Text className='item'>微信号：{userInfo.weChatAccount}</Text>
            <Text className='item'>QQ号：{userInfo.qqAccount}</Text>
            <Text className='item'>Github：{userInfo.githubUrl}</Text>
          </View>
        </View>
      </View>
      <View className='content'>
        <TaroParser
          type='markdown'
          theme='light'
          yumlApi='https://md.werfei.com/?yuml'
          latexApi='https://md.werfei.com/?tex'
          content={marked(aboutContent)}
        />
        <View className='publish-time'>
          <Text className='text'>{userInfo.username}发布于{publishTime}</Text>
        </View>
      </View>
    </View>
  )
}

export default Index
