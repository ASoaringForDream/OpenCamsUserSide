import React from 'react'
import { Form, Input, Button } from 'antd'
import { connect } from 'umi'

const EditPass = ({
  dispatch,
  handleOk
}) => {
  const [form] = Form.useForm();
  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };
  const handleFinish = (values) => {
    dispatch({
      type: 'edit/rePassWord',
      payload: {
        ...values,
      },
      cb: () => {
        handleOk()
        form.resetFields()
      }
    })
  }
  return (
    <Form
      name="nest-messages"
      {...layout}
      style={{
        maxWidth: 600,
      }}
      onFinish={handleFinish}
      form={form}
    >
      <Form.Item
        name="password"
        label="原密码"
        rules={[
          {
            required: true,
          },
          () => ({
            validator(_, value) {
              if (!value || /^[a-zA-Z0-9]{6,18}$/.test(value)) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('密码必须是6-18位(由字母数字下划线组成)'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="rePassword"
        label="新密码"
        rules={[
          {
            required: true,
          },
          () => ({
            validator(_, value) {
              if (!value || /^[a-zA-Z0-9]{6,18}$/.test(value)) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('密码必须是6-18位(由字母数字下划线组成)'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="confirm"
        label="重复新密码"
        dependencies={['rePassword']}
        rules={[
          {
            required: true,
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('rePassword') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('密码不一致'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 20,
        }}
      >
        <Button type="primary" htmlType="submit">
          修改
        </Button>
      </Form.Item>
    </Form>
  )
}

export default connect(({ dispatch }) => ({ dispatch }))(EditPass)