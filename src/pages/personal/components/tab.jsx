import React from 'react'
import { Row, Col, Pagination } from 'antd'
import GridCard from 'components/GridCard'

const Tab = ({
  mainTagList,
  tagList,
  dispatch,
  pagination,
  camList,
  type
}) => {
  const handlePageChange = (page, pageSize) => {
    window.scrollTo(0, 0)
    const payload = type === 'collect' ? {
      CollectPagination: {
        ...pagination,
        current: page,
        pageSize
      }
    } : {
      historyPagination: {
        ...pagination,
        current: page,
        pageSize
      }
    }
    dispatch({
      type: 'personal/updateState',
      payload
    })
    const t = type === 'collect' ? 'personal/queryCollect' : 'personal/queryHistory'
    dispatch({
      type: t,
      payload: {
        page,
        pageSize
      }
    })
  }
  return (
    <Row style={{
      backgroundColor: 'white',
      paddingTop: '10px'
    }}>
      {camList.map(i => (
        <Col span={12}>
          <GridCard cam={i.cam} mainTagList={mainTagList} tagList={tagList} dispatch={dispatch} />
        </Col>
      ))}
      <div className='middle-box'>
        <div>
          <Pagination showQuickJumper {...pagination} onChange={handlePageChange} />
        </div>
      </div>
    </Row>
  )
}

export default Tab