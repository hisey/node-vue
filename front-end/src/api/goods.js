import fetch from '../utils/fetch'
let adminPath = "/api/admin"
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
export const getGoodsList = fetch.get(`${adminPath}/goods/getList`)
export const addGoods = fetch.post(`${adminPath}/goods/addGoods`)
export const addGoodsCategory = fetch.post(`${adminPath}/goods/addGoodsCategory`)
export const getGoodsCategory = fetch.get(`${adminPath}/goods/getCategory`)
export const shelfGoods = fetch.post(`${adminPath}/goods/shelf`)
export const delGoods = fetch.post(`${adminPath}/goods/deleteGoods`)
export const shelfClass = fetch.post(`${adminPath}/goods/shelfCategory`)
export const delClass = fetch.post(`${adminPath}/goods/deleteCategory`)
export const getGoodsDetail = fetch.get(`${adminPath}/goods/getDetail`)
export const addClass = fetch.post(`${adminPath}/goods/addCategory`)



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
