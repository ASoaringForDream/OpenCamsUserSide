import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Layout, Avatar, Popover, Badge, List, Dropdown, Input } from 'antd'
import { history, NavLink } from 'umi'
import { Ellipsis } from 'components'
import {
  BellOutlined,
  RightOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'
import dayjs from 'dayjs'
import classnames from 'classnames'
import { config } from 'utils'
import TopMenu from './Menu'
import styles from './Header.less'

const { Search } = Input

class Header extends PureComponent {
  state = {
    isTop: true
  }
  componentDidMount() {
    window.addEventListener('scroll', (e) => {
      if (document.documentElement.scrollTop === 0) {
        this.setState({
          isTop: true
        })
      } else if (this.state.isTop === true) {
        this.setState({
          isTop: false
        })
      }
    });
  }
  handleSignOut = () => {
    this.props.onSignOut()
  }
  onSearch = (val) => {
    history.push(`/home${val ? `?search=${val}` : ''}`)
  }
  render() {
    const {
      fixed,
      avatar,
      username,
      collapsed,
      notifications,
      onCollapseChange,
      onAllNotificationsRead,
      isHome
    } = this.props

    const items = [
      {
        key: 'editUserInfo',
        label: <NavLink to='/edit'>修改个人信息</NavLink>
      },
      {
        key: 'SignOut',
        label: (
          <span style={{
            display: 'inline-block',
            width: '100%'
          }} onClick={() => {this.props.onSignOut()}}>退出</span>
        )
      },
    ]
    const rightContent = [
      <Dropdown
        menu={{
          items,
        }}
        placement="bottomRight"
      >
        <a href=' ' onClick={(e) => e.preventDefault()}>
          <span style={{ color: '#999', marginRight: 4, paddingLeft: 20 }}>
            你好,
          </span>
          <span style={{ color: '#000' }}>{username}</span>
          <Avatar style={{ marginLeft: 8 }} src={avatar} />
        </a>
      </Dropdown>
    ]

    rightContent.unshift(
      <Popover
        placement="bottomRight"
        trigger="click"
        key="notifications"
        overlayClassName={styles.notificationPopover}
        getPopupContainer={() => document.querySelector('#primaryLayout')}
        content={
          <div className={styles.notification}>
            <List
              itemLayout="horizontal"
              dataSource={notifications}
              locale={{
                emptyText: "已查看所有通知。"
              }}
              renderItem={item => (
                <List.Item className={styles.notificationItem}>
                  <List.Item.Meta
                    title={
                      <Ellipsis tooltip lines={1}>
                        {item.title}
                      </Ellipsis>
                    }
                    description={dayjs(item.date).fromNow()}
                  />
                  <RightOutlined style={{ fontSize: 10, color: '#ccc' }} />
                </List.Item>
              )}
            />
            {notifications.length ? (
              <div
                onClick={onAllNotificationsRead}
                className={styles.clearButton}
              >
                清空通知
              </div>
            ) : null}
          </div>
        }
      >
        <Badge
          count={notifications.length}
          dot
          offset={[-10, 10]}
          className={styles.iconButton}
        >
          <BellOutlined className={styles.iconFont} />
        </Badge>
      </Popover>
    )

    return (
      <Layout.Header
        className={classnames(styles.header, {
          [styles.fixed]: fixed,
          [styles.collapsed]: collapsed,
          [styles.headertransparent]: this.state.isTop && isHome,
          [styles.headerwhite]: !this.state.isTop || !isHome
        })}
        style={{ height: 72, paddingInline: 0 }}
        id="layoutHeader"
      >
        <div className={styles.wrapper}>
          <div className={styles.brand}>
            <div className={styles.logo} >
              <img alt="logo" src={config.logoPath} />
              <h1 style={{
                width: collapsed ? '0' : '150px',
                transition: 'all 0.3s ease-out'
              }}>{!collapsed && config.siteName}</h1>
            </div>
            <div
              className={styles.button}
              onClick={onCollapseChange.bind(this, !collapsed)}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
          </div>
          <div className={styles.rightContainer}>
            <Search
              placeholder="请输入搜索内容"
              allowClear
              onSearch={this.onSearch}
              style={{
                width: 200,
              }}
            />
            <TopMenu />
            {rightContent}
          </div>
        </div>
      </Layout.Header>
    )
  }
}

Header.propTypes = {
  fixed: PropTypes.bool,
  user: PropTypes.object,
  menus: PropTypes.array,
  collapsed: PropTypes.bool,
  onSignOut: PropTypes.func,
  notifications: PropTypes.array,
  onCollapseChange: PropTypes.func,
  onAllNotificationsRead: PropTypes.func,
}

export default Header
