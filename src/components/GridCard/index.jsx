import { Card, Tag } from 'antd';
import React from 'react';
import store from 'store';
import { NavLink } from 'umi';
import styles from './index.less'
const { Meta } = Card;

const GridCard = ({
  cam,
  mainTagList,
  tagList,
  dispatch
}) => {

  const handleClick = () => {
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
    <NavLink to={`/cam?id=${cam.id}`} onClick={handleClick}>
      <Card
        className={styles.card}
        bordered={false}
        cover={
          <img
            alt="example"
            src={`http://127.0.0.1:3389/manage/img/${cam.posterImg}`}
          />
        }
      >
        <Meta
          title={`${cam.tit.replace('era', '摄像头')}---${mainTagList?.find(i => i.id === cam.mainTag)?.name}`}
          description={randerDescription()}
        />

      </Card>
    </NavLink>
  )
}

export default GridCard