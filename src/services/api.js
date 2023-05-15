
const PATH_MAP = {
  queryUserInfo: 'POST /user/session',
  logoutUser: 'DELETE /user/logout',
  loginUser: 'POST /user/login',
  addUser: 'POST /user/adduser',

  querySwiper: '/user/swiper',
  queryCams: '/user/cams',
  queryCamTags: '/user/camTags',

  queryCam: '/user/cam',
  setLike: 'POST /user/setlike',
  setDisLike: 'POST /user/setdislike',
  setCollect: 'POST /user/setcollect',
  clickCam: 'POST /user/clickcam',

  queryUserList: '/manager/users',
  deleteUser: 'DELETE /manager/deleteuser',
  eidtUser: 'POST /manager/edituser',
  banUser: 'POST /manager/banuser',

  queryDashboard: '/dashboard',
}

export default PATH_MAP
