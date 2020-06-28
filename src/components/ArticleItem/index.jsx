import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './index.scss'
import { formatDate } from '../../lib/tools'

const Index = (props)=>{

  const article = props.article
  const clickItem = ()=>{
    Taro.navigateTo({
      url: `/pages/articledetail/index?id=${article.id}`
    })
  }

  return (
    <View className='article-item' onClick={clickItem}>
      <View className='title'>
        {
          !article.reprinted?
          <Text className='original'>原创</Text>
          :
          <Text className='reprinted'>转载</Text>

        }
        <Text className='title-text'>{article.title}</Text>
      </View>
      <View>
        <Image className='img' src={article.introduceImg} />
      </View>
      <View className='sub-info'>
        <View className='sub-info-item'>
          <AtIcon className='info-icon' value='eye' size='16' color='#999999'></AtIcon>
          <Text className='text'>{article.viewCount}</Text>
        </View>
        <View className='sub-info-item'>
            <AtIcon className='info-icon' value='clock' size='16' color='#999999'></AtIcon>
            <Text className='text'>{article && formatDate(article.publishTime)}</Text>
          </View>
      </View>
    </View>
  )
}

export default Index
