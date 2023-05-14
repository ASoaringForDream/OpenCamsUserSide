import React from 'react'
import { connect } from 'umi'
import { Row, Pagination } from 'antd'
import Swiper from 'components/Swiper'
import GridCard from 'components/GridCard'


const Home = ({
  home,
  mainTagList,
  tagList,
  loading,
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
          <GridCard cam={i} mainTagList={mainTagList} tagList={tagList} />
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