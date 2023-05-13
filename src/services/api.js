
const PATH_MAP = {
  queryUserInfo: 'POST /user/session',
  logoutUser: 'DELETE /user/logout',
  loginUser: 'POST /user/login',

  queryManagerList: '/manager/managers',
  addManager: 'POST /manager/addmanager',
  deleteManager: 'DELETE /manager/deletemanager',
  eidtManager: 'POST /manager/editmanager',

  queryRole: '/manager/roles',
  queryRoleList: '/manager/rolelist',

  queryUserList: '/manager/users',
  addUser: 'POST /manager/adduser',
  deleteUser: 'DELETE /manager/deleteuser',
  eidtUser: 'POST /manager/edituser',
  banUser: 'POST /manager/banuser',

  queryDashboard: '/dashboard',
}

export default PATH_MAP
