//导入我们封装好的axios
import service from './index'

// 获取库存前五个
export const soldList = data => service.get('/api/goods/soldList', {params:data});
// 获取评分最高前五个
export const bestList = data => service.get('/api/goods/bestList', {params:data});
// 关键字搜索
export const searchList = data => service.get('/api/goods/searchList', {params:data});






// export const apiRegister = data => service.post('/api/register', data);
// export const apiRegister = data => service.post('/api/register', data);
