import React from 'react'

const Alert = (props) => {
  return (
    <div>
    <div className={`alert alert-${props.alert['type']}`} role="alert">
   <strong>{props.alert['type']}: </strong> {props.alert['msg']}
   </div>
  </div>
  )
}

export default Alert