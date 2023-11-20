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
  const content = JSON.parse(localStorage.getItem("editedContent")) || "";
  const [oldSlug, setOldSlug] = useState();
  const [oldTitle, setOldTitle] = useState();
  const {
    data,
    setData,
    tagList,
    setTagList,
    major,
    setMajor,
    semester,
    setSemester,
    subject,
    setSubject,
    tag,
    setTag,
    subjectID,
    setSubjectID,
    tagID,
    setTagID,
  } = usePostTag();
  const {
    setTitle,
    charCount,
    coverURL,
    setCoverURL,
    wordcount,
    setCharCount,
    setFile,
    setTopic,
    setSkills,
    skills,
  } = useContent();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get(
          process.env.REACT_APP_CATEGORIES_API
        );
        setData(response.data);
      } catch (error) {}
    };
    fetchData();
  }, []);

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
        setOldTitle(post?.data?.title);
        setTitle(post?.data?.title);
        setCharCount(post?.data?.title?.length);
        setCoverURL(post?.data?.coverURL);
        setMajor(post?.data?.category[0]?.categoryName);
        setSubject(post?.data?.category[2]?.categoryName);
        setSubjectID(post?.data?.category[2].categoryId);
        setSemester(post?.data?.category[1]?.categoryName);
        setTag(post?.data?.tag.tagName);
        setTagID(post?.data?.tag.tagId);
        setOldSlug(post?.data?.slug);
        setSkills(post?.data?.postSkill);
      } catch (error) {}
    };
    fetchData();
    return () => {
      localStorage.removeItem("editedContent");
      setMajor(undefined);
      setSemester(undefined);
      setSubject(undefined);
      setTag(undefined);
      setTitle("");
      setFile("");
      setCoverURL("");
      setSkills([]);
    };
  }, [slug]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tagList = await axiosPrivate.get(process.env.REACT_APP_TAGS_API);
        setTagList(tagList.data);
      } catch (error) {}
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topics = await axiosPrivate.get(process.env.REACT_APP_GET_TOPICS);
        setTopic(topics.data);
      } catch (error) {}
    };
    fetchData();
  }, []);

  const handleMajorChange = useCallback((e) => {
    setMajor(e.target.value);
    setSemester();
    setSubject();
    setSubjectID();
    setTag();
    setTagID();
  }, []);

  const handleSemesterChange = useCallback((e) => {
    setSemester(e.target.value);
    setSubject();
    setSubjectID();
    setTag();
    setTagID();
  }, []);

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

  const handleSubmit = useCallback(async () => {
    try {
      if (
        !title ||
        wordcount < 30 ||
        (!coverURL && tag !== "Q&A") ||
        !contentTiny ||
        !tagID ||
        !subjectID
      ) {
        toast.error("Vui lòng điền đầy đủ thông tin");
        return;
      } else if (charCount >= 100) {
        toast.error("Tiêu đề không được dài hơn 100 ký tự");
        return;
      } else if (charCount < 30) {
        toast.error("Tiêu đề quá ngắn");
        return;
      } else if (skills.length === 0) {
        toast.error("Vui lòng chọn từ khóa");
        return;
      }
      let slug = toSlug(title);
      let description = getFirstTagContent(contentTiny);
      let skillsArr = skills.map((item) => item.skillName);
      let response = await axiosPrivate.post(process.env.REACT_APP_EDIT_POST, {
        postId: postDetail?.postId,
        title: title,
        description: description,
        content: contentTiny,
        allowComment: true,
        categoryId: subjectID,
        tagId: tagID,
        coverURL: coverURL,
        slug: slug,
        length: wordcount,
        postSkill: skillsArr,
      });
      if (response.status === 200) {
        localStorage.removeItem("editedContent");
        setMajor(undefined);
        setSemester(undefined);
        setSubject(undefined);
        setTag(undefined);
        setTitle("");
        setFile("");
        setCoverURL("");
        setSkills([]);
        window.scrollTo(0, 0);
        toast.success("Đăng bài thành công");
        navigate(-2, { replace: true });
      }
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi trong quá trình xử lý");
    }
  }, [tagID, subjectID, contentTiny, title, coverURL, skills]);
  return (
    <EditPost
      post={postDetail}
      handleSubmit={handleSubmit}
      handleImage={handleImage}
      data={data}
      setData={setData}
      tagList={tagList}
      setTagList={setTagList}
      major={major}
      setMajor={setMajor}
      semester={semester}
      setSemester={setSemester}
      subject={subject}
      setSubject={setSubject}
      tag={tag}
      setTag={setTag}
      setSubjectID={setSubjectID}
      setTagID={setTagID}
      handleMajorChange={handleMajorChange}
      handleSemesterChange={handleSemesterChange}
    />
  );
}
