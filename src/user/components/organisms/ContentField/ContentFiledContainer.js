import React from 'react'
import ContentField from './ContentField'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

export default function ContentFiledContainer() {
  const axiosPrivate = useAxiosPrivate();
  const handleImage = async (blobInfo) => {
    try {
      const formData = new FormData();
      formData.append("file[]", blobInfo.blob(), blobInfo.filename());
      const response = await axiosPrivate.post(
        process.env.REACT_APP_IMAGE_UPLOAD,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.status === 200) return response?.data.link;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ContentField handleImage={handleImage}/>
  )
}
