import React, { useEffect } from 'react'
import ApprovedQuestions from './ApprovedQuestions'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import useManagePost from '../../../hooks/useManagePost'

export default function ApprovedQuestionsService() {
  const axiosPrivate = useAxiosPrivate()
  const {approvedQ, setApprovedQ} = useManagePost()
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axiosPrivate.get('mentor/q-a/view')
      } catch (error) {
        
      }
    }
  }, [])
  return (
    <ApprovedQuestions/>
  )
}
