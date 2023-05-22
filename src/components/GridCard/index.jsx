import { Card, Tag } from 'antd';
import React from 'react';
import store from 'store';
import { history } from 'umi';
import styles from './index.less'
const { Meta } = Card;

const GridCard = ({
  cam,
  mainTagList,
  tagList,
  dispatch
}) => {

  const handleClick = () => {
    window.scrollTo(0, 0)
    store.set('cid', cam.id)
    history.push(`/cam?id=${cam.id}`)
    const user = store.get('user')
    dispatch({
      type: 'app/clickCam',
      payload: {
        cid: cam.id,
        uid: user.id
      }
    })
  }

  const randerDescription = () => {
    return (
      <>
        {cam.tag.map(i => (
          <Tag color="orange">{tagList?.find(item => item.id === i)?.name}</Tag>
        ))}
        <div style={{
          display: "-webkit-box",
          overflow: "hidden",
          "-webkit-line-clamp": "2",
          "-webkit-box-orient": "vertical",
        }}>
          {cam.desc}
        </div>
      </>
    )
  }
  return (
    <Card
        className={styles.card}
        bordered={false}
        cover={
          <img
            alt="example"
            src={`http://127.0.0.1:3389/manage/img/${cam.posterImg}`}
          />
        }
        onClick={handleClick}
      >
        <Meta
          title={`${cam.tit.replace('摄像头', '').replace('era', '摄像头')}---${mainTagList?.find(i => i.id === cam.mainTag)?.name}`}
          description={randerDescription()}
        />

      </Card>
  )
}

export default GridCard