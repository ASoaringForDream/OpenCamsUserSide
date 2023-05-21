import React from 'react'
import classnames from 'classnames'
import { Tag, Button } from 'antd'
import { NavLink } from 'umi'
import { EyeOutlined } from '@ant-design/icons'
import store from 'store'
import styles from './swiperItem.less'

const SwiperItem = ({
  cam,
  imgLoadedCallBack,
  tagList,
  mainTagList,
  dispatch
}) => {
  const handleClick = () => {
    window.scrollTo(0, 0)
    const user = store.get('user')
    dispatch({
      type: 'app/clickCam',
      payload: {
        cid: cam.id,
        uid: user.id
      }
    })
  }

  return (
    <div className={classnames(styles.swiperItem, { 'slide': true })}>
      <img style={{ width: '100%', height: '100vh' }} onLoad={imgLoadedCallBack} alt='' src={`http://127.0.0.1:3389/manage/img/${cam.posterImg}`} />
      <div className={styles.info}>
        <h1>{`${cam.tit.replace('摄像头', '').replace('era', '摄像头')}---${mainTagList?.find(i => i.id === cam.mainTag)?.name}`}</h1>
        <div className={styles.tags}>
          <Tag color="red">{cam.country}</Tag>
          <Tag color="cyan">{cam.city}</Tag>
          {cam.tag.map(i => (
            <Tag color="orange">{tagList?.find(item => item.id === i)?.name}</Tag>
          ))}
        </div>
        <NavLink to={`/cam?id=${cam.id}`} onClick={handleClick}>
          <Button ghost size='large' icon={<EyeOutlined />} className={styles.button}>观看视频</Button>
        </NavLink>
      </div>
    </div>
  )
}

export default SwiperItem