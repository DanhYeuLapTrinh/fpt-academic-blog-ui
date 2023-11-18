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
    if (tagList && skills) fetchData();
  }, [tagList]);

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
        setMajor(draft?.data?.category[0]?.categoryName);
        setSubject(draft?.data?.category[2]?.categoryName);
        setSubjectID(draft?.data?.category[2].categoryId);
        setSemester(draft?.data?.category[1]?.categoryName);
        setTag(draft?.data?.tag.tagName);
        setTagID(draft?.data?.tag.tagId);
        setSkills(draft?.data?.postSkill);
      } catch (error) {
        if (error?.response?.status === 405) {
          toast.error("Tài khoản của bạn đã bị khóa");
          navigate("/login", { replace: true });
          localStorage.removeItem("auth");
        }
      }
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
      if (error?.response?.status === 405) {
        toast.error("Tài khoản của bạn đã bị khóa");
        navigate("/login", { replace: true });
        localStorage.removeItem("auth");
      }
    }
  };
  const handleSubmit = useCallback(
    async (e) => {
      try {
        if (
          !title ||
          charCount < 30 ||
          wordcount < 30 ||
          !coverURL ||
          !contentTiny
        ) {
          console.log(title, charCount, wordcount, coverURL, contentTiny);
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
        let apiCallURL =
          e.target.value === "draft"
            ? process.env.REACT_APP_EDIT_DRAFT
            : "drafts/send";
        let slug = toSlug(title);
        let description = getFirstTagContent(contentTiny);
        let skillsArr = skills.map((item) => item.skillName);
        let response;
        if (e.target.value === "draft") {
          response = await axiosPrivate.post(apiCallURL, {
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
            postSkill: skillsArr,
          });
        } else {
          response = await axiosPrivate.post(process.env.REACT_APP_EDIT_DRAFT, {
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
            postSkill: skillsArr,
          });

          response = await axiosPrivate.post(apiCallURL, {
            postId: draftDetail.postId,
          });
        }

        if (response.status === 200) {
          localStorage.removeItem("draftContent");
          setTitle("");
          setFile("");
          setCoverURL("");
          setSkills([]);
          window.scrollTo(0, 0);
          toast.success(
            e.target.value === "draft" ? "Đã lưu nháp" : "Đăng bài thành công"
          );
          navigate("/draft", { replace: true });
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
    [tagID, subjectID, contentTiny, title, coverURL, skills]
  );

  const deleteDraft = async () => {
    try {
      let response = await axiosPrivate.post(
        process.env.REACT_APP_REMOVE_DRAFT,
        {
          postId: draftDetail.postId,
        }
      );
      if (response) {
        navigate("/draft", { replace: true });
      }
    } catch (error) {
      if (error?.response?.status === 405) {
        toast.error("Tài khoản của bạn đã bị khóa");
        navigate("/login", { replace: true });
        localStorage.removeItem("auth");
      }
    }
  };
  return (
    <EditDraft
      draft={draftDetail}
      handleSubmit={handleSubmit}
      handleImage={handleImage}
      deleteDraft={deleteDraft}
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
