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
export const login = fetch.post(`${adminPath}/adminUser/login`)
export const logOut = fetch.post(`${adminPath}/adminUser/logout`)

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
