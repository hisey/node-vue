import fetch from '../utils/fetch'
let adminPath = "/api/admin"
export const getAdminUserList = fetch.get(`${adminPath}/adminUser/getList`)
export const changeAdminUserStatus = fetch.post(`${adminPath}/adminUser/changeStatus`)
export const delAdminUser = fetch.post(`${adminPath}/adminUser/delete`)
export const addAdminUser = fetch.post(`${adminPath}/adminUser/add`)

//role
export const getAdminRoleList = fetch.get(`${adminPath}/adminUser/getRoleList`)
export const changeAdminRoleStatus = fetch.post(`${adminPath}/adminUser/changeRoleStatus`)
export const delAdminUserRole = fetch.post(`${adminPath}/adminUser/deleteRole`)
export const addAdminUserRole = fetch.post(`${adminPath}/adminUser/addUserRole`)


