import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './index.scss'
import { formatDate } from '../../lib/tools'

const Index = (props)=>{
  const novel = props.novel
  const clickItem = ()=>{
    Taro.navigateTo({
      url: `/pages/noveldetail/index?id=${novel.id}`
    })
  }

  return (
    <View className='novel-item' onClick={clickItem}>
      <View className='title'>
        <Text className='title-text'>{novel.novelName}：{novel.name}</Text>
      </View>
      <View className='sub-info'>
        <View className='sub-info-item'>
          <AtIcon value='eye' size='16' color='#999999'></AtIcon>
          <Text className='text'>{novel.viewCount}</Text>
        </View>
        <View className='sub-info-item'>
            <AtIcon className='icon' value='clock' size='16' color='#999999'></AtIcon>
            <Text className='text'>{novel && formatDate(novel.publishTime, true)}</Text>
          </View>
      </View>
    </View>
  )
}

export default Index
