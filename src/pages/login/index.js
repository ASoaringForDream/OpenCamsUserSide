import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Button, Row, Input, Form, Modal } from 'antd'
import { GlobalFooter } from 'components'
import config from 'utils/config'
import AddUser from './components/add'
import styles from './index.less'

const FormItem = Form.Item

@connect(({ loading, dispatch }) => ({ loading, dispatch }))
class Login extends PureComponent {
  state = {
    isModalOpen: false
  }
  showModal = () => {
    this.setState({
      isModalOpen: true
    })
  };
  handleOk = () => {
    this.setState({
      isModalOpen: false
    })
  };
  handleCancel = () => {
    this.setState({
      isModalOpen: false
    })
  };

  render() {
    const { dispatch, loading } = this.props

    const handleOk = values => {
      dispatch({ type: 'login/login', payload: values })
    }

    return (
      <Fragment>
        <div className={styles.form}>
          <div className={styles.logo}>
            <img alt="logo" src={config.logoPath} />
            <span>{config.siteName}</span>
          </div>
          <Form
            onFinish={handleOk}
          >
            <FormItem name="username"
              rules={[{ required: true }]} hasFeedback>
              <Input
                placeholder="用户名"
              />
            </FormItem>
            <FormItem name="password" rules={[{ required: true }]} hasFeedback>
              <Input type='password' placeholder="密码" />
            </FormItem>
            <Row>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading.effects.login}
              >
                登录
              </Button>
            </Row>
          </Form>
          <Button type='link' style={{ marginTop: 10 }} onClick={this.showModal}>
            注册用户
          </Button>
        </div>
        <div className={styles.footer}>
          <GlobalFooter copyright={config.copyright} />
        </div>
        <Modal title="创建用户" open={this.state.isModalOpen} onCancel={this.handleCancel} footer={null}>
          <AddUser handleOk={this.handleOk} />
        </Modal>
      </Fragment>
    )
  }
}

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Login
