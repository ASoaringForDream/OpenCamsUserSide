import React from 'react'
import classnames from 'classnames'
import { Tag, Button } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import styles from './swiperItem.less'

const SwiperItem = ({
  cam,
  imgLoadedCallBack,
  tagList,
  mainTagList
}) => {
  return (
    <div className={classnames(styles.swiperItem, { 'slide': true })}>
      <img style={{ width: '100%' }} onLoad={imgLoadedCallBack} alt='' src={`http://127.0.0.1:3389/manage/img/${cam.posterImg}`} />
      <div className={styles.info}>
        <h1>{`${cam.tit.replace('era', '摄像头')}---${mainTagList?.find(i => i.id === cam.mainTag)?.name}`}</h1>
        <div className={styles.tags}>
          <Tag color="red">{cam.country}</Tag>
          <Tag color="cyan">{cam.city}</Tag>
          {cam.tag.map(i => (
            <Tag color="orange">{tagList?.find(item => item.id === i)?.name}</Tag>
          ))}
        </div>
        <Button ghost size='large' icon={<EyeOutlined />} className={styles.button}>观看视频</Button>
      </div>
    </div>
  )
}

export default SwiperItem