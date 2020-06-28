import Taro, { useState } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtTag } from 'taro-ui'
import './index.scss'

const Index = (props)=>{

  const [ current, setCurrent ] = useState(0)

  const changeTag = ( index, { active, name })=>{
    if (!active) {
      setCurrent(index)
      props.getArticleList(name)
    }
  }

  return (
    <ScrollView className='tag-list' scrollX>
      {
        props.articleTypes && props.articleTypes.map((item, index) => {
          return (
            <View className='tag' key={item.name + index}>

              <AtTag
                name={item.name}
                type='primary'
                size='small'
                active={current === index}
                circle
                onClick={changeTag.bind(this, index)}
              >
                {item.name}
              </AtTag>
            </View>
          )
        })
      }
    </ScrollView>
  )
}

export default Index
