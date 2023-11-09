import React from 'react'
import TrendingTagList from '../../molecules/TrendingTagList/TrendingTagList'
import Text from '../../atoms/Text/Text'

export default function TrendingTagSection(props) {
  return (
    <div>
      <Text fontSize="20px" padding="5px 0 10px 0">Đang được quan tâm</Text>
      <TrendingTagList trendingTags={props.trendingTags}/>
    </div>
  )
}
