import React from 'react'
import { connect } from 'umi'
import Swiper from 'components/Swiper'


const Home = ({
  home,
  loading,
  dispatch
}) => {
  const { swiperList } = home
  console.log(home);
  return (
    <>
      <Swiper cams={swiperList} />
    </>
  )
}

export default connect(({ home, loading, dispatch }) => ({ home, loading, dispatch }))(Home)