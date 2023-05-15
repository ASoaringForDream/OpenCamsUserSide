import React from 'react'
import { Row, Col } from 'antd'
import { connect, NavLink } from 'umi'
import CamTagCard from './components/index'

const CamTag = ({
  mainTagList,
  tagList
}) => {
  return (
    <>
      <div className='block-box'>分类</div>
      <Row>
        {mainTagList.map(i => (
          <Col span={8}>
          <NavLink to={`/home?mainTag=${i.id}`}>
            <CamTagCard tag={i} ></CamTagCard>
          </NavLink>
          </Col>
        ))}
      </Row>
      <div className='block-box'>标签</div>
      <Row>
        {tagList.map(i => (
          <Col span={8}>
            <NavLink to={`/home?tag=${i.id}`}>
            <CamTagCard tag={i} ></CamTagCard>
          </NavLink>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default connect(({ app }) => ({ mainTagList: app.mainTagList, tagList: app.tagList }))(CamTag)