import { Stack } from '@mui/material'
import React from 'react'
import QA from '../../organisms/QA/QA'
import { timeConverter } from '../../../utils/StringMethod'

export default function ApprovedQuestions(props) {
  return (
    <Stack p={"20px 0"} spacing={2}>
      {props?.approvedQ?.map((item) => (
        <QA
          key={item.postId}
          full
          title={item?.title}
          description={item?.description}
          pending
          majorName={item?.category[0]?.categoryName}
          majorID={item?.category[0]?.categoryId}
          subjectName={item?.category[2]?.categoryName}
          subjectID={item?.category[2]?.categoryId}
          tagName={item?.tag.tagName}
          tagID={item?.tag.tagId}
          time={timeConverter(item?.dateOfPost)}
          src={item?.avatarURL}
          userId={item?.userId}
          label={item?.accountName}
          slug={`/view/${item?.slug}`}
        />
      ))}
    </Stack>
  )
}
