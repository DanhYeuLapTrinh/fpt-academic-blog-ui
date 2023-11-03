import { ManagePostContext } from '../context/ManagePostProvider'
import { useContext } from 'react'

export default function useManagePost() {
  return useContext(ManagePostContext)
}
