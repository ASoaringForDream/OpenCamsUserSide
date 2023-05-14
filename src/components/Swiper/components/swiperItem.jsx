import React from 'react'
import classnames from 'classnames'
import styles from './swiperItem.less'

const SwiperItem = ({
  cam, 
  imgLoadedCallBack
}) => {
  return (
    <div className={classnames(styles.swiperItem, {'slide': true})}>
      <img style={{ width: '100%' }} onLoad={imgLoadedCallBack} alt='' src={`http://127.0.0.1:3389/manage/img/${cam.posterImg}`} />
    </div>
  )
}

export default SwiperItem