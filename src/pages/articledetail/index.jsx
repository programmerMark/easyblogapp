import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { View, Text, Image } from "@tarojs/components";
import { AtIcon } from 'taro-ui'
import marked from 'marked'
import TaroParser from 'taro-parse'
import { servicePath } from '../../config/apiBaseUrl'
import './index.scss'
import { formatTime } from '../../lib/tools'

const Index = ()=>{
  const title = '文章详情'
  const router = useRouter()

  const [ article, setArticle ] = useState({})

  const getArticleById = (id)=>{
    Taro.showLoading({
      title: '加载中...'
    })
    Taro.request({
      method: 'get',
      url: servicePath.getArticleDetailById + id
    })
      .then(res=>{
        Taro.hideLoading()
        const result = res.data
        if (result.success) {
          setArticle(result.data)
        }
      })
  }

  useEffect(()=>{
    Taro.setNavigationBarTitle({
      title: title
    });
    const tmpId = router.params.id
    getArticleById(tmpId)
    // 下方注释，避免ESLint自动补全
    // eslint-disable-next-line
  }, [])

  return (
    <View className='article-detail'>
      <View className='title'>{article.title}</View>
      <View className='img-wrapper'>
        <Image className='img' src={article.introduceImg} mode='aspectFit' />
      </View>
      <View className='sub-info'>
        <View className='info-item'>
          <AtIcon className='icon' value='eye' size='16' color='#999999'></AtIcon>
          <Text className='text'>{article.viewCount}</Text>
        </View>
        <View className='info-item'>
          <AtIcon className='icon' value='clock' size='16' color='#999999'></AtIcon>
          <Text className='text'>{ article.publishTime && formatTime(article.publishTime * 1000, 'yyyy-MM-dd')}</Text>
        </View>
        <View className='info-item'>
          <AtIcon className='icon' value='user' size='16' color='#999999'></AtIcon>
          <Text className='text'>{ article.authorName}</Text>
        </View>
      </View>
      <View className='content'>
        {
          article.content &&
          <TaroParser
            type='markdown'
            theme='light'
            yumlApi='https://md.werfei.com/?yuml'
            latexApi='https://md.werfei.com/?tex'
            content={marked(article.content)}
          />
        }
      </View>
    </View>
  )
}

export default Index
