import fetch from '../utils/fetch'

// export function login(user_name, pass) {
//   return request({
//     url: '/api/user/login',
//     method: 'post',
//     data: {
//       user_name,
//       pass
//     }
//   })
// }
// export const login = (user_name, pass) => {
//   fetch.post('/api/user/login', {
//     user_name,
//     pass
//   })
// }
export const getGoodsList= fetch.get('api/admin/goods/list')
export const addGoods= fetch.post('api/admin/goods/addGoods')
export const addGoodsCategory= fetch.post('api/admin/goods/addGoodsCategory')
export const goodsCategory= fetch.get('api/admin/goods/goodsCategory')

// export function getInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

// export function logout() {
//   return request({
//     url: '/api/admin/user/logout',
//     method: 'post'
//   })
// }
