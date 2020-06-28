import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, ScrollView } from "@tarojs/components";
import { servicePath } from '../../config/apiBaseUrl'
import './index.scss'
import TalkItem from '../../components/TalkItem'

const Index = ()=>{
  const title = '说说'
  const pageSize = 5
  const [ currentPage, setCurrentPage ] = useState(1)
  const [ flag, setFlag ] = useState(true)
  const [ talkList, setTalkList ] = useState([])
  const [ total, setTotal ] = useState(0)

  const  getTalkList = (current)=>{
    Taro.showLoading({
      title: '加载中...'
    })
    if (!current) {
      current = currentPage
    } else {
      setCurrentPage(current)
    }
    Taro.request({
      method: 'post',
      url: servicePath.getTalkList,
      data: {
        limit: pageSize,
        offset: (current - 1) * pageSize
      }
    })
      .then(res=>{
        Taro.hideLoading()
        setFlag(true)
        const result = res.data
        if (result.success) {
          setTotal(result.data.total)
          const list = JSON.parse(JSON.stringify(talkList))
          setTalkList(list.concat(result.data.list))
        }
      })
  }

  const handleScrollToLower = ()=>{
    if (!flag) {
      return
    }
    setFlag(false)
    if (talkList.length < total) {
      getTalkList(currentPage + 1)
    } else {
      setFlag(true)
      Taro.showToast({
        title: '没有更多说说',
        icon: 'none',
        duration: 1000
      })
    }
  }

  useEffect(()=>{
    Taro.setNavigationBarTitle({
      title: title
    });
    getTalkList()
    // 下方注释，避免ESLint自动补全
    //eslint-disable-next-line
  }, [])

  return (
    <ScrollView
      className='talk-wrapper'
      scrollY
      lowerThreshold={100}
      onScrollToLower={handleScrollToLower}
    >
      {
        talkList.length > 0 ?
        talkList.map((item, index)=>{
          return (
            <TalkItem key={item.id + index} talkItem={item} />
          )
        })
        :
        <View className='no-more-data'>博主还没有发表过说说哦</View>
      }
    </ScrollView>
  )
}

export default Index
