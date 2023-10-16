import React from 'react'
import { Link } from 'react-router-dom'
import Text from '../Text/Text'

export default function PostTag(props) {
  return (
    <Link to="#" style={{textDecoration: 'none'}}>
      <Text fontSize="12px" color={props.color} fontWeight="600">#SWP391</Text>
    </Link>
  )
}
