
const PATH_MAP = {
  queryUserInfo: 'POST /user/session',
  logoutUser: 'DELETE /user/logout',
  loginUser: 'POST /user/login',
  addUser: 'POST /user/adduser',

  querySwiper: '/user/swiper',
  queryCams: '/user/cams',
  queryCamTags: '/user/camTags',

  queryCam: '/user/cam',

  queryUserList: '/manager/users',
  deleteUser: 'DELETE /manager/deleteuser',
  eidtUser: 'POST /manager/edituser',
  banUser: 'POST /manager/banuser',

  queryDashboard: '/dashboard',
}

export default PATH_MAP
