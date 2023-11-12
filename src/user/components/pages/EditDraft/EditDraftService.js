import React, { useState } from 'react'
import EditDraft from './EditDraft'
import { axiosPrivate } from '../../../api/axios'

export default function EditDraftService() {
  const axiosPrivate = axiosPrivate()
  const [draftDetail, setDraftDetail] = useState()
  return (
    <EditDraft/>
  )
}
