import useAuth from "../../../hooks/useAuth";
import usePostTag from "../../../hooks/usePostTag";
import { getFirstTagContent, toSlug } from "../../../utils/StringMethod";
import React, { useCallback, useEffect } from "react";
import Write from "./Write";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import useContent from "../../../hooks/useContent";
import { toast } from "react-toastify";
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
    setTopic,
    skills,
    setSkills,
  } = useContent();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
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

  // useEffect(() => {
  //   let interval = setInterval(() => {
  //     if (!title) {
  //       toast.error("Vui lòng nhập tiêu đề hợp lệ");
  //     }
  //   }, 1000 * 30);
  //   return () => clearInterval(interval);
  // }, [title]);

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

  const handleSubmit = useCallback(
    async (e) => {
      try {
        if (!title) {
          toast.error("Vui lòng nhập tiêu đề hợp lệ");
          return;
        } else if (charCount < 30 || charCount > 100) {
          toast.error("Tiêu đề phải có độ dài từ 30 đến 100 ký tự");
          return;
        } else if (!coverURL && tag !== "Q&A") {
          toast.error("Vui lòng chọn ảnh bìa");
          return;
        } else if (wordcount < 30) {
          toast.error("Nội dung bài viết phải có ít nhất 30 từ");
          return;
        } else if (skills.length === 0) {
          toast.error("Vui lòng chọn ít nhất một từ khóa");
          return;
        } else if (!tagID || !subjectID) {
          toast.error("Vui lòng chọn đầy đủ chủ đề");
          return;
        }
        let apiCallURL =
          e.target.value === "draft"
            ? process.env.REACT_APP_ADD_TO_DRAFT
            : process.env.REACT_APP_CREATE_POST;
        let slug = toSlug(title);
        let description = getFirstTagContent(contentTiny);
        let postCoverURL = tag !== "Q&A" ? coverURL : "";
        let skillsArr = skills.map((item) => item.skillName);
        let response = await axiosPrivate.post(apiCallURL, {
          title: title,
          description: description,
          content: contentTiny,
          allowComment: true,
          categoryId: subjectID,
          tagId: tagID,
          coverURL: postCoverURL,
          slug: slug,
          length: wordcount,
          postSkill: skillsArr,
        });
        if (response.status === 200) {
          localStorage.removeItem("content");
          setMajor(undefined);
          setSemester(undefined);
          setSubject(undefined);
          setTag(undefined);
          setTitle("");
          setFile("");
          setCoverURL("");
          setSkills([]);
          window.scrollTo(0, 0);
          toast.success(
            e.target.value === "draft" ? "Đã lưu nháp" : "Đăng bài thành công"
          );
          navigate("/", { replace: true });
        }
      } catch (error) {
        if (error?.response?.status === 405) {
          toast.error("Tài khoản của bạn đã bị khóa");
          navigate("/login", { replace: true });
          localStorage.removeItem("auth");
        } else {
          toast.error("Có lỗi trong quá trình xử lý");
        }
      }
    },
    [tagID, subjectID, contentTiny, title, coverURL, tag, skills]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get(
          process.env.REACT_APP_CATEGORIES_API
        );
        setData(response.data);
      } catch (error) {
        if (error?.response?.status === 405) {
          toast.error("Tài khoản của bạn đã bị khóa");
          navigate("/login", { replace: true });
          localStorage.removeItem("auth");
        }
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tagList = await axiosPrivate.get(process.env.REACT_APP_TAGS_API);
        setTagList(tagList.data);
      } catch (error) {
        if (error?.response?.status === 405) {
          toast.error("Tài khoản của bạn đã bị khóa");
          navigate("/login", { replace: true });
          localStorage.removeItem("auth");
        }
      }
    };
    if (data) fetchData();
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topics = await axiosPrivate.get(process.env.REACT_APP_GET_TOPICS);
        setTopic(topics.data);
      } catch (error) {
        if (error?.response?.status === 405) {
          toast.error("Tài khoản của bạn đã bị khóa");
          navigate("/login", { replace: true });
          localStorage.removeItem("auth");
        }
      }
    };
    if (tagList) fetchData();
  }, [tagList]);

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
