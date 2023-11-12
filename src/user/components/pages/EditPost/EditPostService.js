import React, { useCallback, useEffect, useState } from "react";
import EditPost from "./EditPost";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate, useParams } from "react-router-dom";
import useContent from "../../../hooks/useContent";
import usePostTag from "../../../hooks/usePostTag";
import { toast } from "react-toastify";
import { getFirstTagContent, toSlug } from "../../../utils/StringMethod";

export default function EditPostService() {
  const axiosPrivate = useAxiosPrivate();
  const [postDetail, setPostDetail] = useState({});
  const { slug } = useParams();
  const navigate = useNavigate();
  const { title, contentTiny } =
    JSON.parse(localStorage.getItem("editedContent")) || "";
  const [oldSlug, setOldSlug] = useState();
  const [oldTitle, setOldTitle] = useState();
  const {
    setTitle,
    charCount,
    coverURL,
    setCoverURL,
    wordcount,
    setCharCount,
    setFile,
  } = useContent();
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
  const { subjectID, setSubjectID, tagID, setTagID } = usePostTag();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let post = await axiosPrivate.post(process.env.REACT_APP_VIEW_A_POST, {
          slug: slug,
        });
        localStorage.setItem(
          "editedContent",
          JSON.stringify({
            contentTiny: post?.data?.content,
            title: post?.data?.title,
          })
        );
        setPostDetail(post?.data);
        setTitle(post?.data?.title);
        setOldTitle(post?.data?.title);
        setCharCount(post?.data?.title?.length);
        setCoverURL(post?.data?.coverURL);
        setSubjectID(post?.data?.category[2].categoryId);
        setTagID(post?.data?.tag.tagId);
        setOldSlug(post?.data?.slug);
      } catch (error) {}
    };
    fetchData();
    return () => {
      localStorage.removeItem("editedContent");
    };
  }, [slug]);

  const handleSubmit = useCallback(async () => {
    try {
      if (!title || wordcount < 30 || !coverURL || !contentTiny) {
        toast.error("Vui lòng điền đầy đủ thông tin");
        return;
      } else if (charCount >= 100) {
        toast.error("Tiêu đề không được dài hơn 100 ký tự");
        return;
      } else if (charCount < 30) {
        toast.error("Tiêu đề quá ngắn");
        return;
      }
      let slug = toSlug(title);
      let description = getFirstTagContent(contentTiny);
      let editedContent =
        contentTiny +
        "\n\n" +
        `<p><strong>Phiên bản mới của: </strong><a href="http://localhost:3000/view/${oldSlug}">${oldTitle}</a></p>`;
      let response = await axiosPrivate.post(process.env.REACT_APP_EDIT_POST, {
        postId: postDetail?.postId,
        title: title,
        description: description,
        content: editedContent,
        allowComment: true,
        categoryId: subjectID,
        tagId: tagID,
        coverURL: coverURL,
        slug: slug,
        length: wordcount,
      });
      if (response.status === 200) {
        localStorage.removeItem("editedContent");
        setTitle("");
        setFile("");
        setCoverURL("");
        window.scrollTo(0, 0);
        toast.success("Đăng bài thành công");
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi trong quá trình xử lý");
    }
  }, [tagID, subjectID, contentTiny, title, coverURL]);
  return <EditPost post={postDetail} handleSubmit={handleSubmit} handleImage={handleImage}/>;
}
