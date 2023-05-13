import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Switch, Layout } from 'antd'
import { t } from "@lingui/macro"
import { Trans } from "@lingui/macro"
import { BulbOutlined } from '@ant-design/icons'
import ScrollBar from '../ScrollBar'

import SiderMenu from './Menu'
import styles from './Sider.less'

class Sider extends PureComponent {
  render() {
    const {
      menus,
      theme,
      collapsed,
      role,
      onThemeChange,
    } = this.props

    return (
      <Layout.Sider
        width={256}
        theme={theme}
        breakpoint="lg"
        trigger={null}
        collapsible
        collapsed={collapsed}
        className={styles.sider}
      >
        <div className={styles.menuContainer}>
          <ScrollBar
            options={{
              // Disabled horizontal scrolling, https://github.com/utatti/perfect-scrollbar#options
              suppressScrollX: true,
            }}
          >
            <SiderMenu
              menus={menus}
              theme={theme}
              collapsed={collapsed}
              role={role}
            />
          </ScrollBar>
        </div>
        {!collapsed && (
          <div className={styles.switchTheme}>
            <span>
              <BulbOutlined />
              <Trans>Switch Theme</Trans>
            </span>
            <Switch
              onChange={onThemeChange.bind(
                this,
                theme === 'dark' ? 'light' : 'dark'
              )}
              defaultChecked={theme === 'dark'}
              checkedChildren={t`Dark`}
              unCheckedChildren={t`Light`}
            />
          </div>
        )}
      </Layout.Sider>
    )
  }
}

Sider.propTypes = {
  menus: PropTypes.array,
  theme: PropTypes.string,
  role: PropTypes.array,
  collapsed: PropTypes.bool,
  onThemeChange: PropTypes.func,
}

export default Sider
