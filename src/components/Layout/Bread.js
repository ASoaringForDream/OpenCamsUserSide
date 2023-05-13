import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb } from 'antd'
import { withRouter } from 'umi'
import iconMap from 'utils/iconMap'
import { queryBreads } from 'utils'
import styles from './Bread.less'

@withRouter
class Bread extends PureComponent {
  generateBreadcrumbs = (paths) => {
    return paths.map((item, key) => {

      return (
        item && (
          <Breadcrumb.Item key={key}>
            {item.icon && (
              <span style={{ marginRight: 4 }}>{iconMap[item.icon]}</span>
            )}
            {item.name}
          </Breadcrumb.Item>
        )
      )
    })
  }
  render() {
    const { menus, location } = this.props

    const paths = queryBreads(menus, location.pathname)

    return (
      <Breadcrumb className={styles.bread}>
        {this.generateBreadcrumbs(paths)}
      </Breadcrumb>
    )
  }
}

Bread.propTypes = {
  menus: PropTypes.array,
}

export default Bread
