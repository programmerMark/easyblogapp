const serverUrl = 'https://immortalboy.cn'
const baseUrl = 'https://immortalboy.cn/api/blog'

const servicePath = {
  getArticleTypes: baseUrl + '/articlelist/getArticleTypes', // 获取文章分类
  getArticleListWithType: baseUrl + '/articlelist/getArticleList', // 获取文章列表
  getTalkList: baseUrl + '/index/getTalkList', // 获取说说列表
  getAbout: baseUrl + '/about/getAbout', // 获取关于我页面数据
  getUserInfoById: baseUrl + '/index/getUserInfoById/', // 获取博主信息
  getUserInfoById: baseUrl + '/index/getUserInfoById/', // 获取博主信息
  getNovelList: baseUrl + '/index/getNovelList', // 获取小说列表
  getIndexListApp: baseUrl + '/index/getIndexListApp', // 获取小说或者文章列表
  getSearchList: baseUrl + '/index/getSearchList', // 根据搜索关键字获取小说或者文章列表
  getArticleDetailById: baseUrl + '/articledetail/getArticleDetailById/', // 根据id获取文章详情
  getChapterById: baseUrl + '/novel/getChapterById/', // 根据id获取小说详情
  getChapterListById: baseUrl + '/novel/getChapterListById/', // 根据id获取章节列表
}

export {
  serverUrl,
  servicePath
}
