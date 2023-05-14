import React, { useState } from 'react'
import { Form, Input, DatePicker, Button, Select, Upload, message } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import ImgCrop from 'antd-img-crop'
import { connect } from 'umi'
import { SEX_MAP } from 'utils/constant'

const AddUser = ({
  dispatch,
  handleOk
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只允许上传jpg或png格式图片');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大于2MB');
    }
    return isJpgOrPng && isLt2M;
  };
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const handleFinish = (values) => {
    dispatch({
      type: 'login/addUser',
      payload: {
        ...values,
        birth: values.birth?.format('YYYY-MM-DD'),
        userpic: imageUrl
      },
      cb: () => {
        handleOk()
        form.resetFields()
        setImageUrl(null)
      }
    })
  }
  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        上传
      </div>
    </div>
  );

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
        name="username"
        label="用户名"
        rules={[
          {
            required: true,
          },
          () => ({
            validator(_, value) {
              if (!value || /^[a-zA-Z]\w{5,17}$/.test(value)) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('用户名必须是8-18位(由字母数字下划线组成,字母开头)'));
            },
          }),
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="密码"
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
        label="重复密码"
        dependencies={['password']}
        rules={[
          {
            required: true,
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
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
        name="name"
        label="名字"
        rules={[
          {
            max:20,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="sex"
        label="性别"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="请选择性别"
          showSearch
          allowClear
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={SEX_MAP}
        />
      </Form.Item>
      <Form.Item
        name="userpic"
        label="头像"
        rules={[
          () => ({
            validator() {
              if (imageUrl) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('请上传头像'));
            },
          }),
        ]}
      >
        <ImgCrop zoomSlider rotationSlider showGrid>
          <Upload
            name="avatar"
            listType="picture-circle"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: '100%',
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </ImgCrop>
      </Form.Item>
      <Form.Item
        name="mailbox"
        label="邮箱"
        rules={[
          {
            type: 'email',
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="telephone"
        label="手机号码"
        rules={[
          {
            required: true
          },
          () => ({
            validator(_, value) {
              if (!value || /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(value)) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('手机号码格式错误'));
            },
          }),
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="birth"
        label="出生日期"
      >
        <DatePicker
          format="YYYY-MM-DD" 
        />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 20,
        }}
      >
        <Button type="primary" htmlType="submit">
          创建
        </Button>
      </Form.Item>
    </Form>
  )
}

export default connect(({ dispatch }) => ({ dispatch }))(AddUser)