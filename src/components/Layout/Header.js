import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Menu, Layout, Avatar, Popover, Badge, List } from 'antd'
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

const { SubMenu } = Menu

class Header extends PureComponent {
  handleClickMenu = e => {
    e.key === 'SignOut' && this.props.onSignOut()
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
    } = this.props

    const rightContent = [
      <Menu key="user" mode="horizontal" onClick={this.handleClickMenu}>
        <SubMenu
          title={
            <Fragment>
              <span style={{ color: '#999', marginRight: 4 }}>
                你好,
              </span>
              <span>{username}</span>
              <Avatar style={{ marginLeft: 8 }} src={avatar} />
            </Fragment>
          }
        >
          <Menu.Item key="SignOut">
            退出
          </Menu.Item>
        </SubMenu>
      </Menu>,
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
        })}
        style={{ height: 72, backgroundColor: 'white', paddingInline: 0 }}
        id="layoutHeader"
      >
        <div className={styles.brand}>
          <div className={styles.logo} >
            <img alt="logo" src={config.logoPath} />
            <h1 style={{
              width: collapsed ? '0' : '150px',
              transition: 'all 0.3s ease-out'
            }}>{ !collapsed && config.siteName}</h1>
          </div>
          <div
            className={styles.button}
            onClick={onCollapseChange.bind(this, !collapsed)}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        </div>
        <div className={styles.rightContainer}>
          <TopMenu />
          {rightContent}
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
