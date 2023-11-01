import React, { useEffect, useState } from 'react'
import PendingQuestions from './PendingQuestions'
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export default function PendingQuestionsService() {
  const [questions, setQuestions] = useState()
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get("mentor/q-a/view");
        setQuestions(response.data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData()
  }, [])
  return (
    <PendingQuestions questions={questions}/>
  )
}
