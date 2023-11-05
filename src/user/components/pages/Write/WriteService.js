import useAuth from "../../../hooks/useAuth";
import usePostTag from "../../../hooks/usePostTag";
import { getFirstTagContent, toSlug } from "../../../utils/StringMethod";
import React, { useCallback, useEffect } from "react";
import Write from "./Write";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import useContent from "../../../hooks/useContent";
import { toast } from "react-toastify";
import { setIn } from "formik";
export default function WriteService() {
  const { title, contentTiny } =
    JSON.parse(localStorage.getItem("content")) || "";
  const {
    setTitle,
    charCount,
    coverURL,
    content,
    setContent,
    setCoverURL,
    wordcount,
    setCharCount,
    setFile,
  } = useContent();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const auth = useAuth();
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
  useEffect(() => {
    setTitle(title);
    setContent(content);
    setCharCount(title?.length);
  }, []);
  useEffect(() => {
    let interval = setInterval(() => {
      if (!title) {
        toast.error("Vui lòng nhập tiêu đề hợp lệ");
      }
    }, 1000 * 30);
    return () => clearInterval(interval);
  }, [title]);
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

  const handleSubmit = useCallback(async () => {
    try {
      if (!title || !coverURL || !contentTiny || !tagID || !subjectID) {
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
      let postCoverURL = tag !== "Q&A" ? coverURL : "";
      let response = await axiosPrivate.post(
        process.env.REACT_APP_CREATE_POST,
        {
          accountId: auth?.id,
          title: title,
          description: description,
          content: contentTiny,
          allowComment: true,
          categoryId: subjectID,
          tagId: tagID,
          coverURL: postCoverURL,
          slug: slug,
          length: wordcount,
        }
      );
      if (response.status === 200) {
        localStorage.removeItem("content");
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
  }, [tagID, subjectID, contentTiny, title, coverURL, tag]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get(
          process.env.REACT_APP_CATEGORIES_API
        );
        const tagList = await axiosPrivate.get(process.env.REACT_APP_TAGS_API);

        setData(response.data);
        setTagList(tagList.data);
      } catch (error) {
        if (!error?.response) {
          console.log("No server response");
        } else if (error?.response?.status === 403) {
          navigate("/login");
        } else if (error?.response?.status === 401) {
          // Xử lý sau
          console.log(error);
        } else {
          // Xử lý sau
          console.log(error);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <Write
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
      handleSubmit={handleSubmit}
    />
  );
}
