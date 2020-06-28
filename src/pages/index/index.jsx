import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, ScrollView, Text } from '@tarojs/components'
import { AtSearchBar, AtTabs, AtTabsPane } from 'taro-ui'
import './index.scss'
import ArticleItem from '../../components/ArticleItem/index'
import NovelItem from '../../components/NovelItem/index'
import TagList from '../../components/TagList/index'
import { servicePath } from '../../config/apiBaseUrl'

const Index = ()=>{
  const title = '首页'
  const pageSize = 5
  const tabList = [{ title: '最新' }, { title: '技术文章' }, { title: '个人分享' }]
  const [ searchValue, setSearchValue ] = useState('')
  const [ searchPlaceholder, setSearchPlaceholder ] = useState('搜索感兴趣的技术文章、个人分享文章')
  const [ currentType, setCurrentType ] = useState('全部')
  const [ articleTypes, setArticleTypes ] = useState([])
  const [ currentTab, setCurrentTab ] = useState(0)
  const [ flag, setFlag ] = useState(true)

  const [ currentPage, setCurrentPage ] = useState(1)
  const [ total, setTotal ] = useState([])
  const [ articleList, setArticleList ] = useState([])

  const onActionClick = ()=>{
    let type = 'all'
    switch (currentTab) {
      case 0:
        type = 'all'
        break;
      case 1:
        type = 'article'
        break;
      case 2:
        type = 'novel'
        break;
    }
    const dataProps = {
      type: type,
      searchValue,
      limit: pageSize,
      offset: (currentPage - 1) * pageSize
    }
    Taro.showLoading({
      title: '加载中...'
    })
    Taro.request({
      method: 'post',
      url: servicePath.getSearchList,
      data: dataProps
    })
      .then(res=>{
        Taro.hideLoading()
        const result = res.data
        if (result.success) {
          setTotal(result.data.total? result.data.total: 0)
          if (type === 'all') {
            const articles = []
            const chapters = []
            result.data.articleList.forEach(item=>{
              item.listType = 'article'
              articles.push(item)
            })
            result.data.chapterList.forEach(item=>{
              item.listType = 'novel'
              chapters.push(item)
            })
            const totalList = articles.concat(chapters)
            setArticleList(totalList)
          } else {
            setArticleList(result.data.list)
          }
        } else {
          Taro.showToast({
            title: result.message,
            icon: 'none',
            duration: 1000
          })
          setArticleList([])
        }
      })
  }

  const changeTab = (value)=>{
    setCurrentTab(value)
    setCurrentPage(1)
    setArticleList([])
    setSearchValue('')
    switch (value) {
      case 0:
        getTotalList(1)
        setSearchPlaceholder('搜索感兴趣的技术文章、个人分享文章')
        break;
      case 1:
        getArticleList(currentType, 1)
        setSearchPlaceholder('搜索感兴趣的技术文章')
        break;
      case 2:
        getNovelList(1)
        setSearchPlaceholder('搜索感兴趣的个人分享文章')
        break;
    }
  }

  const handleScrollToLower = (index)=>{
    if (!flag) {
      return
    }
    setFlag(false)
    if (articleList.length < total) {
      switch (index) {
        case 0:
          setCurrentPage(currentPage + 1)
          getTotalList(currentPage + 1, false)
          break;
        case 1:
          setCurrentPage(currentPage + 1)
          getArticleList(currentType, currentPage + 1, false)
          break;
        case 2:
          setCurrentPage(currentPage + 1)
          getNovelList(currentPage + 1, false)
          break;
      }
    } else {
      setFlag(true)
      Taro.showToast({
        title: '没有更多文章',
        icon: 'none',
        duration: 1000
      })
    }
  }

  const getArticleList = (type, current, reset = true) => {
    setCurrentType(type)
    Taro.showLoading({
      title: '加载中...'
    })
    let offset
    if (current) {
      offset = (current - 1) * pageSize
    } else {
      offset = (currentPage - 1) * pageSize
    }
    Taro.request({
      method: 'post',
      url: servicePath.getArticleListWithType,
      data: {
        type,
        limit: pageSize,
        offset: offset
      }
    })
      .then(res=>{
        Taro.hideLoading()
        setFlag(true)
        const result = res.data
        if (result.success) {
          setTotal(result.data.total)
          if (reset) {
            setArticleList(result.data.list)
          } else {
            const articles = JSON.parse(JSON.stringify(articleList))
            const list = articles.concat(result.data.list)
            setArticleList(list)
          }
        } else {
          Taro.showToast({
            title: result.message,
            icon: 'none',
            duration: 1000
          })
        }
      })
  }

  const getTotalList = (current, reset = true)=>{
    Taro.showLoading({
      title: '加载中...'
    })
    let offset
    if (current) {
      offset = (current - 1) * pageSize
    } else {
      offset = (currentPage - 1) * pageSize
    }
    Taro.request({
      method: 'post',
      url: servicePath.getIndexListApp,
      data: {
        limit: pageSize,
        offset: offset
      }
    })
      .then(res=>{
        Taro.hideLoading()
        setFlag(true)
        const result = res.data
        if (result.success) {
          setTotal(result.data.total)
          const articles = []
          const chapters = []
          result.data.articleList.forEach(item=>{
            item.listType = 'article'
            articles.push(item)
          })
          result.data.chapterList.forEach(item=>{
            item.listType = 'novel'
            chapters.push(item)
          })
          const totalList = articles.concat(chapters)
          if (reset) {
            setArticleList(totalList)
          } else {
            const currentArticles = JSON.parse(JSON.stringify(articleList))
            const list = currentArticles.concat(totalList)
            setArticleList(list)
          }
        } else {
          Taro.showToast({
            title: result.message,
            icon: 'none',
            duration: 1000
          })
        }
      })
  }

  const getNovelList = (current, reset = true)=>{
    Taro.showLoading({
      title: '加载中...'
    })
    let offset
    if (current) {
      offset = (current - 1) * pageSize
    } else {
      offset = (currentPage - 1) * pageSize
    }
    Taro.request({
      method: 'post',
      url: servicePath.getNovelList,
      data: {
        limit: pageSize,
        offset: offset
      }
    })
      .then(res=>{
        Taro.hideLoading()
        setFlag(true)
        const result = res.data
        if (result.success) {
          if (reset) {
            setArticleList(result.data.list)
            setTotal(result.data.total)
          } else {
            const articles = JSON.parse(JSON.stringify(articleList))
            const list = articles.concat(result.data.list)
            setArticleList(list)
            setTotal(result.data.total)
          }
        } else {
          Taro.showToast({
            title: result.message,
            icon: 'none',
            duration: 1000
          })
        }
      })
  }

  useEffect(()=>{
    Taro.setNavigationBarTitle({
      title: title
    });
    Taro.request({
      method: 'get',
      url: servicePath.getArticleTypes
    })
      .then(res=>{
        const result = res.data
        if (result.success) {
          const list = result.data
          list.unshift({
            id: 1,
            name: '全部'
          })
          list.push({
            id: 2,
            name: '点击量'
          })
          setArticleTypes(list)
        }
      })
      getTotalList()
      // 下方注释，避免ESLint自动补全
      //eslint-disable-next-line
  },[])

  return (
    <View className='index'>
      <view className='searchbar'>
        <AtSearchBar
          placeholder={searchPlaceholder}
          actionName='搜索'
          value={searchValue}
          onChange={(value)=>setSearchValue(value)}
          onActionClick={onActionClick}
        />
      </view>
      <view className='tabs'>
        <AtTabs className='tabs' current={currentTab} tabList={tabList} onClick={changeTab}>
          <AtTabsPane className='tab-content' current={currentTab} index={0} >
            <ScrollView className='scroll-view' scrollY onScrollToLower={handleScrollToLower.bind(this, 0)}>
              {
                articleList.length > 0?
                articleList.map((item, index) => {
                  if (item.listType === 'article') {
                    return (
                      <ArticleItem key={item.id + index} article={item} />
                    )
                  } else if (item.listType === 'novel') {
                    return (
                      <NovelItem key={item.id + index} novel={item} />
                    )
                  }
                })
                :
                <Text className='no-article'>没有相关文章、个人分享文章哦</Text>
              }
            </ScrollView>
          </AtTabsPane>
          <AtTabsPane className='tab-content' current={currentTab} index={1}>
            <TagList articleTypes={articleTypes} getArticleList={getArticleList} />
            <ScrollView className='scroll-view' scrollY onScrollToLower={handleScrollToLower.bind(this, 1)}>
              {
                articleList.length > 0?
                articleList.map((item, index) => {
                  return (
                    <ArticleItem key={item.id + index} article={item} />
                  )
                })
                :
                <Text className='no-article'>没有相关文章哦</Text>
              }
            </ScrollView>
          </AtTabsPane>
          <AtTabsPane className='tab-content' current={currentTab} index={2}>
          <ScrollView  className='scroll-view' scrollY onScrollToLower={handleScrollToLower.bind(this, 2)}>
            {
              articleList.length > 0?
              articleList.map((item, index) => {
                return (
                  <NovelItem key={item.id + index} novel={item} />
                )
              })
              :
              <Text className='no-article'>没有相关个人分享文章哦</Text>
            }
          </ScrollView>
          </AtTabsPane>
        </AtTabs>
      </view>
    </View>
  )
}

export default Index
