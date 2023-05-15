import React, { useState, useEffect } from 'react'
import { Form, Input, DatePicker, Button, Select, Upload, message } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import ImgCrop from 'antd-img-crop'
import moment from 'moment'
import { connect } from 'umi'
import { SEX_MAP } from 'utils/constant'

const EditUser = ({
  initValue,
  dispatch,
  handleOk
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    setImageUrl(initValue.userpic)
    form.setFieldsValue({
      state: initValue.state,
      name: initValue.name,
      sex: initValue.sex,
      mailbox: initValue.mailbox,
      telephone: initValue.telephone,
      birth: moment(initValue.birth).add(8, 'hours'),
      
    })
  }, [form, initValue])

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
      type: 'edit/editUser',
      payload: {
        ...values,
        birth: values.birth?.format('YYYY-MM-DD'),
        userpic: imageUrl,
        id: initValue.id
      },
      cb: () => {
        handleOk()
        handleReset()
      }
    })
  }
  const handleReset = () => {
    form.setFieldsValue({
      state: initValue.state,
      name: initValue.name,
      sex: initValue.sex,
      mailbox: initValue.mailbox,
      telephone: initValue.telephone,
      birth: moment(initValue.birth).add(8, 'hours'),
      
    })
    setImageUrl(initValue.userpic)
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
        name="name"
        label="名字"
        rules={[
          {
            required: true,
            max: 20,
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
          offset: 16,
        }}
      >
        <div className='handle-box'>
          <Button type="link" onClick={handleReset}>
            重置
          </Button>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </div>
      </Form.Item>
    </Form>
  )
}

export default connect(({ dispatch }) => ({ dispatch }))(EditUser)