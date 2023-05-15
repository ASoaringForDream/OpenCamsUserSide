import { Card } from 'antd';
import React from 'react';
import styles from './index.less'
const { Meta } = Card;

const CamTagCard = ({tag}) => {
  return (
    <Card 
        className={styles.card}
        bordered={false}
        cover={
          <img
            alt="example"
            src={`/${tag.name}.jpg`}
          />
        }
      >
        <Meta
          title={tag.name}
        />
        
      </Card>
  )
}

export default CamTagCard