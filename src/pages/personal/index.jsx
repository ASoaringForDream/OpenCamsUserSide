import React from 'react'
import { connect, history } from 'umi';
import { Tabs } from 'antd';
import Tab from './components/tab';
import './index.less'

const Personal = ({
  mainTagList,
  tagList,
  personal,
  dispatch
}) => {
  const { selectKey, collectList, CollectPagination, historyList, historyPagination } = personal
  const items = [
    {
      key: 'collect',
      label: `我的收藏`,
      children: <Tab mainTagList={mainTagList} tagList={tagList} dispatch={dispatch} camList={collectList} pagination={CollectPagination} type='collect' />,
    },
    {
      key: 'history',
      label: `历史记录`,
      children: <Tab mainTagList={mainTagList} tagList={tagList} dispatch={dispatch} camList={historyList} pagination={historyPagination} type='history' />,
    }
  ];

  const onChange = (key) => {
    history.push(`/personal?tab=${key}`)
  };
  return (
    <Tabs
      type="card"
      items={items}
      activeKey={selectKey}
      onChange={onChange}
      className='tab-wrapper'
    />
  )
}
export default connect(({ app, personal, loading, dispatch }) => ({ mainTagList: app.mainTagList, tagList: app.tagList, personal, loading, dispatch }))(Personal)