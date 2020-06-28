import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { View, Text } from "@tarojs/components";
import { AtIcon, AtDrawer  } from 'taro-ui'
import marked from 'marked'
import TaroParser from 'taro-parse'
import { servicePath } from '../../config/apiBaseUrl'
import './index.scss'
import { formatTime } from '../../lib/tools'

const Index = ()=>{
  const router = useRouter()

  const [ article, setArticle ] = useState({})
  const [ catalogIsShow, setCatalogIsShow ] = useState(false)
  const [ chapterList, setChapterList ] = useState([])
  const [ chapterNameList, setChapterNameList ] = useState([])

  const getChapterById = (id)=>{
    Taro.showLoading({
      title: '加载中...'
    })
    Taro.request({
      method: 'get',
      url: servicePath.getChapterById + id
    })
      .then(res=>{
        const result = res.data
        if (result.success) {
          setArticle(result.data)
          Taro.setNavigationBarTitle({
            title: result.data.novelName
          });
          getNovelByIdApp(result.data.novelId)
        }
      })
  }

  const getNovelByIdApp = (id) => {
    Taro.request({
      method: 'get',
      url: servicePath.getChapterListById + id
    })
      .then(res=>{
        Taro.hideLoading()
        const result = res.data
        if (result.success) {
          setChapterList(result.data)
          let list = []
          result.data.forEach(item=>{
            list.push(item.name)
          })
          setChapterNameList(list)
        }
      })
  }

  const handleToDetail = (id)=>{
    Taro.redirectTo({
      url: `/pages/noveldetail/index?id=${id}`
    })
  }

  const CloseCatalog = ()=>{
    setCatalogIsShow(false)
  }

  const clickDrawerItem = (index)=>{
    const chapterId = chapterList[index].id
    Taro.redirectTo({
      url: `/pages/noveldetail/index?id=${chapterId}`
    })
  }

  useEffect(()=>{
    const tmpId = router.params.id
    getChapterById(tmpId)
    // 下方注释，避免ESLint自动补全
    // eslint-disable-next-line
  }, [])

  return (
    <View className='novel-detail'>
      <View className='title'>{article.title}</View>
      <View className='sub-info'>
        <View className='info-item'>
          <AtIcon className='icon' value='eye' size='16' color='#999999'></AtIcon>
          <Text className='text'>{article.viewCount}</Text>
        </View>
        <View className='info-item'>
          <AtIcon className='icon' value='clock' size='16' color='#999999'></AtIcon>
          <Text className='text'>{ article.updateTime && formatTime(article.updateTime * 1000, 'yyyy-MM-dd')}</Text>
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
            className='text'
            type='markdown'
            theme='light'
            yumlApi='https://md.werfei.com/?yuml'
            latexApi='https://md.werfei.com/?tex'
            content={marked(article.content)}
          />
        }
      </View>
      <View className='pager'>
        {
          article.preId &&
          <View className='item' onClick={handleToDetail.bind(this, article.preId)}><Text>上一章</Text></View>
        }
        <View className='item' onClick={()=>{setCatalogIsShow(true)}}><Text>目录</Text></View>
        {
          article.nextId &&
          <View className='item' onClick={handleToDetail.bind(this, article.nextId)}><Text>下一章</Text></View>
        }
      </View>
      <AtDrawer
        show={catalogIsShow}
        mask
        onClose={CloseCatalog}
        onItemClick={clickDrawerItem}
        items={chapterNameList}
      >
        </AtDrawer>
    </View>
  )
}

export default Index
