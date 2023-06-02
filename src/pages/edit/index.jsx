import React, { useState } from 'react'
import { Descriptions, Button, Avatar, Card, Modal, Tooltip } from 'antd';
import store from 'store';
import moment from 'moment'
import EditUser from './components/editUser';
import EditPass from './components/editPass'
import iconMap from 'utils/iconMap'

const { Item } = Descriptions;

const Edit = () => {
  const user = store.get('user')
  const [isModalOpen, SetModalOpen] = useState(false)
  const [isPassModal, SetPassModal] = useState(false)
  const showModal = () => {
    SetModalOpen(true)
  };
  const handleOk = () => {
    SetModalOpen(false)
  };
  const handleCancel = () => {
    SetModalOpen(false)
  };
  const showPassModal = () => {
    SetPassModal(true)
  }
  const handlePassCancel = () => {
    SetPassModal(false)
  }
  const handlePassOk = () => {
    SetPassModal(false)
  }
  return (
    <Card>
      <Descriptions title="用户信息" column={2} extra={
        (
          <>
            <Tooltip title='修改密码'>
              <Button style={{ marginRight: 20 }} onClick={showPassModal}>{iconMap['edit']}</Button>
            </Tooltip>
            <Button type='primary' onClick={showModal}>编辑</Button>
          </>
        )
      } bordered>
        <Item label="姓名">{user.name}</Item>
        <Item label="性别">{user.sex}</Item>
        <Item label="头像">{<Avatar style={{ marginLeft: 8, width: 50, height: 50 }} src={user.userpic} />}</Item>
        <Item label="手机号码">{user.telephone}</Item>
        <Item label="邮箱">{user.mailbox}</Item>
        <Item label="出生日期">{moment(user.birth).format('YYYY-MM-DD')}</Item>
      </Descriptions>
      <Modal title="编辑用户信息" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <EditUser handleOk={handleOk} initValue={user} />
      </Modal>
      <Modal title="修改密码" open={isPassModal} onCancel={handlePassCancel} footer={null}>
        <EditPass handleOk={handlePassOk} />
      </Modal>
    </Card>
  )
}

export default Edit