import React from 'react'
import { connect, NavLink } from 'umi'
import { Divider, Tag, Card, Tooltip, Row, Col } from 'antd'
import GridCard from 'components/GridCard'
import styles from './index.less'

const Cam = ({
  cam,
  mainTagList,
  tagList,
  recommend
}) => {

  return (
    <>
      <Card className={styles.wrpper}>
        <h1>{cam.tit.replace('era', '摄像头')}</h1>
        <Divider />
        <div className={styles.addrWrapper}>
          <div>
            <NavLink to={`/home?country=${cam.country}`}>
              <Tooltip placement='top' title='国家'>
                <Tag color="red">{cam.country}</Tag>
              </Tooltip>
            </NavLink>
            {cam.state && (
              <NavLink to={`/home?state=${cam.state}`}>
                <Tooltip placement='top' title='地区'>
                  <Tag color="green">{cam.state}</Tag>
                </Tooltip>
              </NavLink>
            )}
            <NavLink to={`/home?city=${cam.city}`}>
              <Tooltip placement='top' title='城市'>
                <Tag color="cyan">{cam.city}</Tag>
              </Tooltip>
            </NavLink>
          </div>
          <div>
            <Tooltip placement="top" title='资源原地址'>
              <a href={cam.origin} target='_blank' rel="noreferrer">{cam.origin.replace(/.*www.(.*).com.*/, '$1').toUpperCase()}</a>
            </Tooltip>
          </div>
        </div>
      </Card>
      <Card className={styles.camWrapper}>
        <div className={styles.cam}>
          <iframe width='900' height='500' src={cam.source} title=' ' frameborder="0"></iframe>
        </div>
        <div >
          <div style={{
            margin: 10
          }}>
            <NavLink to={`/home?mainTag=${cam.mainTag}`} style={{
              textIndent: 0
            }}>
              <Tag color='#87d068'>{mainTagList.find(item => item.id === cam.mainTag).name}</Tag>
            </NavLink>
            {cam.tag.map(i => (
              <NavLink to={`/home?tag=${i}`} style={{
                textIndent: 0
              }}>
                <Tag color='orange'>{tagList.find(item => item.id === i).name}</Tag>
              </NavLink>
            ))}
          </div>
          <div className={styles.desc}>
            {cam.desc}
          </div>
        </div>
      </Card>
      <Card>
        <div className='block-box'>更多推荐</div>
        <Row>
        {recommend.map(i => (
          <Col span={12}>
            <GridCard cam={i} mainTagList={mainTagList} tagList={tagList} />
          </Col>
        ))}
        </Row>
      </Card>
    </>
  )
}
export default connect(({ cam, app }) => ({ recommend: cam.recommend, cam: cam.cam, mainTagList: app.mainTagList, tagList: app.tagList }))(Cam)