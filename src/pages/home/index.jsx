import React from 'react'
import { connect } from 'umi'
import { Row, Pagination, Col } from 'antd'
import Swiper from 'components/Swiper'
import GridCard from 'components/GridCard'


const Home = ({
  home,
  mainTagList,
  tagList,
  loading,
  location,
  dispatch
}) => {
  const { swiperList, camList, pagination } = home
  const handlePageChange = (page, pageSize) => {
    dispatch({
      type: 'cam/updateState',
      payload: {
        pagination: {
          ...pagination,
          current: page,
          pageSize
        }
      }
    })
    dispatch({
      type: 'home/queryCams',
      payload: {
        ...location.query,
        page,
        pageSize
      }
    })
  }
  return (
    <>
      <Swiper cams={swiperList} tagList={tagList} mainTagList={mainTagList} />
      <Row style={{
        marginTop: '100vh'
      }}>
        {camList.map(i => (
          <Col span={12}>
            <GridCard cam={i} mainTagList={mainTagList} tagList={tagList} />
          </Col>
        ))}
        <div className='middle-box'>
          <div>
            <Pagination showQuickJumper {...pagination} onChange={handlePageChange} />
          </div>
        </div>
      </Row>
    </>
  )
}

export default connect(({ app, home, loading, dispatch }) => ({ mainTagList: app.mainTagList, tagList: app.tagList, home, loading, dispatch }))(Home)