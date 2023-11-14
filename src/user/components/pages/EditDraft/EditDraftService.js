import React, { useCallback, useEffect, useState } from "react";
import EditDraft from "./EditDraft";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import usePostTag from "../../../hooks/usePostTag";
import useContent from "../../../hooks/useContent";
import { toast } from "react-toastify";
import { getFirstTagContent, toSlug } from "../../../utils/StringMethod";

export default function EditDraftService() {
  const axiosPrivate = useAxiosPrivate();
  const [draftDetail, setDraftDetail] = useState({});
  const { slug } = useParams();
  const navigate = useNavigate();
  const { title, contentTiny } =
    JSON.parse(localStorage.getItem("draftContent")) || "";
  const {
    setTitle,
    charCount,
    coverURL,
    setCoverURL,
    wordcount,
    setCharCount,
    setFile,
  } = useContent();

  const { subjectID, setSubjectID, tagID, setTagID } = usePostTag();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let draft = await axiosPrivate.post(process.env.REACT_APP_VIEW_A_POST, {
          slug: slug,
        });
        localStorage.setItem(
          "draftContent",
          JSON.stringify({
            contentTiny: draft?.data?.content,
            title: draft?.data?.title,
          })
        );
        setDraftDetail(draft?.data);
        setTitle(draft?.data?.title);
        setCharCount(draft?.data?.title?.length);
        setCoverURL(draft?.data?.coverURL);
        setSubjectID(draft?.data?.category[2].categoryId);
        setTagID(draft?.data?.tag.tagId);
      } catch (error) {}
    };
    fetchData();
    return () => {
      localStorage.removeItem("draftContent");
    };
  }, [slug]);

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
  const handleSubmit = useCallback(
    async (e) => {
      try {
        if (!title || charCount < 30 || wordcount < 30 || !coverURL || !contentTiny) {
          console.log(title, charCount, wordcount, coverURL, contentTiny)
          toast.error("Vui lòng điền đầy đủ thông tin");
          return;
        } else if (charCount >= 100) {
          toast.error("Tiêu đề không được dài hơn 100 ký tự");
          return;
        } else if (charCount < 30) {
          toast.error("Tiêu đề quá ngắn");
          return;
        }
        let apiCallURL =
          e.target.value === "draft"
            ? process.env.REACT_APP_EDIT_DRAFT
            : process.env.REACT_APP_CREATE_POST;
        let slug = toSlug(title);
        let description = getFirstTagContent(contentTiny);
        let response = await axiosPrivate.post(apiCallURL, {
          postId: draftDetail.postId,
          title: title,
          description: description,
          content: contentTiny,
          allowComment: true,
          categoryId: subjectID,
          tagId: tagID,
          coverURL: coverURL,
          slug: slug,
          length: wordcount,
        });
        if (response.status === 200) {
          localStorage.removeItem("draftContent");
          setTitle("");
          setFile("");
          setCoverURL("");
          window.scrollTo(0, 0);
          toast.success(
            e.target.value === "draft" ? "Đã lưu nháp" : "Đăng bài thành công"
          );
          navigate("/draft", { replace: true });
        }
      } catch (error) {
        console.log(error);
        toast.error("Có lỗi trong quá trình xử lý");
      }
    },
    [tagID, subjectID, contentTiny, title, coverURL]
  );

  const deleteDraft = async () => {
    try {
      let response = await axiosPrivate.post(process.env.REACT_APP_REMOVE_DRAFT, {
        postId: draftDetail.postId,
      })
      if(response) {
        navigate("/draft", { replace: true });
      }
    } catch (error) {
      
    }
  }
  return (
    <EditDraft
      draft={draftDetail}
      handleSubmit={handleSubmit}
      handleImage={handleImage}
      deleteDraft={deleteDraft}
    />
  );
}
