import Taro from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { AtIcon } from 'taro-ui'
import './index.scss'
import { formatDate } from '../../lib/tools'

const Index = (props)=>{
  const talkItem = props.talkItem

  return (
    <View className='talk-item'>
      <View className='user'>
        <Image className='portrait' src={talkItem.portrait} />
        <View className='user-info'>
          <Text className='username'>{talkItem.name}</Text>
          <Text className='publish-time'>{talkItem && formatDate(talkItem.publishTime, true)}</Text>
        </View>
      </View>
      <View className='content'>
        <Text>{talkItem.content}</Text>
      </View>
      <View className='sub-opt'>
        <View className='item'>
          <AtIcon prefixClass='icon' value='comment-app' size='14' color='#787878'></AtIcon>
          <Text className='text'>{talkItem.commentCount}</Text>
        </View>
        <View className='item'>
          <AtIcon prefixClass='icon' value='zan-app' size='14' color='#787878'></AtIcon>
          <Text className='text'>{talkItem.likeCount}</Text>
        </View>
        <View></View>
      </View>
    </View>
  )
}

export default Index
