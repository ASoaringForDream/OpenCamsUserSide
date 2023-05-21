import React from 'react'
import { Row, Col } from 'antd'
import { connect } from 'umi'
import GridCard from 'components/GridCard'
import './index.less'

const Recommend = ({
  recommend,
  mainTagList,
  tagList,
  dispatch
}) => {
  return (
    <>
      <div className='middle-box'>
        <h1>
          享你所想，爱你所爱
        </h1>
      </div>
      <Row>
        {recommend.map(i => (
          <Col span={12}>
            <GridCard cam={i} mainTagList={mainTagList} tagList={tagList} dispatch={dispatch} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default connect(({ recommend, app, dispatch }) => ({ recommend: recommend.recommend, mainTagList: app.mainTagList, tagList: app.tagList, dispatch }))(Recommend)