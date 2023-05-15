import React, { PureComponent, Fragment } from 'react'
import { Menu } from 'antd'
import { NavLink, withRouter } from 'umi'
import { queryAncestors } from 'utils'
import iconMap from 'utils/iconMap'
import { MENU } from 'utils/constant'

const { SubMenu } = Menu

@withRouter
class TopMenu extends PureComponent {

  generateMenus = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <SubMenu
            key={item.id}
            title={
              <Fragment>
                {item.icon && iconMap[item.icon]}
                <span>{item.name}</span>
              </Fragment>
            }
          >
            {this.generateMenus(item.children)}
          </SubMenu>
        )
      }
      return (
        <Menu.Item key={item.id}>
          <NavLink to={item.route} onClick={() => window.scrollTo(0, 0)}>
            {item.icon && iconMap[item.icon]}
            <span>{item.name}</span>
          </NavLink>
        </Menu.Item>
      )
    })
  }

  render() {
    const {
      location,
    } = this.props

    // Find the key that should be selected according to the current menu.
    const selectedKeys = queryAncestors(MENU, location.pathname)

    return (
      <Menu
        mode="horizontal"
        theme='light'
        selectedKeys={selectedKeys}
        style={{
          backgroundColor: 'transparent'
        }}
      >
        {this.generateMenus(MENU)}
      </Menu>
    )
  }
}

export default TopMenu
