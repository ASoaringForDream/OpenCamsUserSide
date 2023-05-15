import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'umi'
import { connect } from 'umi'
import { MyLayout, GlobalFooter } from 'components'
import { FloatButton, Layout } from 'antd';
import { config } from 'utils'
import styles from './PrimaryLayout.less'
import store from 'store'
const { pathToRegexp } = require("path-to-regexp")

const { Content } = Layout
const { Header } = MyLayout

@withRouter
@connect(({ app, loading }) => ({ app, loading }))
class PrimaryLayout extends PureComponent {

  onCollapseChange = collapsed => {
    this.props.dispatch({
      type: 'app/handleCollapseChange',
      payload: collapsed,
    })
  }

  render() {
    const { app, dispatch, children, location } = this.props
    const { collapsed, notifications } = app
    const user = store.get('user') || {}
    const { onCollapseChange } = this

    const headerProps = {
      collapsed,
      notifications,
      onCollapseChange,
      avatar: user.userpic,
      username: user.name,
      fixed: config.fixedHeader,
      isHome: pathToRegexp('/home').exec(location.pathname),
      onAllNotificationsRead() {
        dispatch({ type: 'app/allNotificationsRead' })
      },
      onSignOut() {
        dispatch({ type: 'app/signOut' })
      },
    }
    return (
      (<Fragment>
        <Layout>
          <div
            className={styles.container}
            style={{ paddingTop: config.fixedHeader ? 72 : 0 }}
            id="primaryLayout"
          >
            <Header {...headerProps} />
            <div className={styles.contentWrapper}>
              <Content className={styles.content}>
                {children}
              </Content>
            </div>
            <FloatButton.BackTop
              className={styles.backTop}
              target={() => document.querySelector('#primaryLayout')}
            />
            <GlobalFooter
              className={styles.footer}
              copyright={config.copyright}
            />
          </div>
        </Layout>
      </Fragment>)
    );
  }
}

PrimaryLayout.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
}

export default PrimaryLayout
