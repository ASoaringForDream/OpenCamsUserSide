import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'


const Dashboard = (props) => {

  return (
    <div>
      Dashboard
    </div>
  )
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ dashboard, loading }) => ({
  dashboard,
  loading,
}))(Dashboard)
