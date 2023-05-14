import React, { useState, useRef, useEffect } from 'react'
import _ from 'lodash'
import classnames from 'classnames'
import styles from './index.less'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import SwiperItem from './components/swiperItem'

const Swiper = ({
  cams,
  divide = 3000,
  animDuration = 300,
  tagList,
  mainTagList
}) => {
  const [camsClone, setCamClone] = useState(cams)
  useEffect(() => {
    let first = _.cloneDeep(cams[0])
    let last = _.cloneDeep(cams[cams.length - 1])
    setCamClone([last, ...cams, first])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const swiper = useRef()
  const [imgLoaded, setImgLoaded] = useState(0)
  const [timer, setTimer] = useState(null)
  const [curr, setCurr] = useState(0)
  let current = useRef(1)
  const imgLoadedCallBack = () => {
    setImgLoaded(imgLoaded + 1)
  }
  const handleScroll = () => {
    current.current++
    if (current.current >= camsClone.length) {
      current.current = 2
      swiper.current.style.transition = "transform 0ms"
      const length = Math.ceil(-swiper.current.offsetWidth / camsClone.length)
      swiper.current.style.transform = `translate3d(${length}px,0,0)`
    }
    setTimeout(() => {
      swiper.current.style.transition = "transform " + animDuration + "ms"
      const length = Math.ceil(-swiper.current.offsetWidth / camsClone.length * current.current)
      swiper.current.style.transform = `translate3d(${length}px,0,0)`
      if (current.current !== 0 && current.current !== camsClone.length - 1) {
        setCurr(current.current - 1)
      } else if (current.current === 0) {
        setCurr(cams.length)
      } else {
        setCurr(0)
      }
    }, 0);
  }
  const goBack = () => {
    clearInterval(timer)
    current.current--
    if (current.current <= 0) {
      current.current = camsClone.length - 2
      swiper.current.style.transition = "transform 0ms"
      const length = Math.ceil(-swiper.current.offsetWidth / camsClone.length) * (camsClone.length - 1)
      swiper.current.style.transform = `translate3d(${length}px,0,0)`
    }
    setTimeout(() => {
      swiper.current.style.transition = "transform " + animDuration + "ms"
      const length = Math.ceil(-swiper.current.offsetWidth / camsClone.length * current.current)
      swiper.current.style.transform = `translate3d(${length}px,0,0)`
      setTimer(setInterval(() => handleScroll(), divide))
    }, 0);
    if (current.current !== 0 && current.current !== camsClone.length - 1) {
      setCurr(current.current - 1)
    } else if (current.current === 0) {
      setCurr(cams.length)
    } else {
      setCurr(0)
    }
  }
  const goNext = () => {
    clearInterval(timer)
    handleScroll()
    setTimer(setInterval(() => handleScroll(), divide))
  }

  if (imgLoaded === camsClone?.length && !timer) {
    const length = Math.ceil(-swiper.current.offsetWidth / camsClone.length)
    swiper.current.style.transform = `translate3d(${length}px,0,0)`
    swiper.current.style.transition = "transform " + animDuration + "ms"
    setTimer(setInterval(() => handleScroll(), divide))
  }
  return (
    <div className={styles.swiperwrapper}>
      <div ref={swiper} className={styles.swiper} style={{
        width: `${camsClone?.length * 100}vw`
      }}>
        {
          camsClone?.map(i => (
            <SwiperItem tagList={tagList} mainTagList={mainTagList} cam={i} imgLoadedCallBack={imgLoadedCallBack} />
          ))
        }
      </div>
      <div className={styles.leftBtn} onClick={goBack}><LeftOutlined className={styles.icon} /></div>
      <div className={styles.rightBtn} onClick={goNext}><RightOutlined className={styles.icon} /></div>
      <div className={styles.circle}>
        {cams?.map((_, idx) => {
          const handleClick = () => {
            clearInterval(timer)
            current.current = idx
            handleScroll()
            setTimer(setInterval(() => handleScroll(), divide))
          }
          return (
            <span className={classnames(styles.circleItem, {
              [styles.active]: idx === curr
            })} onClick={handleClick}>{ }</span>
          )
        })}
      </div>
    </div>
  )
}

export default Swiper