import React, { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Text from "../../atoms/Text/Text";
import { FormHelperText, IconButton, Stack } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import usePostTag from "../../../hooks/usePostTag";
import { axiosPrivate } from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
export default function PostFilter() {
  const axiosPrivate = useAxiosPrivate();
  const {auth} = useAuth()
  console.log(auth)
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
    setMajorID,
    setSemesterID,
    setSubjectID,
    setTagID,
  } = usePostTag();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get("categories");
        const tagList = await axiosPrivate.get("tags");

        setData(response.data);
        setTagList(tagList.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const handleMajorChange = (e) => {
    setMajor(e.target.value);
    setSemester();
    setSemesterID();
    setSubject();
    setSubjectID();
    setTag();
    setTagID();
  };

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
    setSubject();
    setSubjectID();
    setTag();
    setTagID();
  };
  return (
    <Stack direction={"row"} spacing={1}>
      <FormControl error={major === undefined && true}>
        <Select
          sx={{ height: "30px", pr: "5px" }}
          IconComponent={KeyboardArrowDownIcon}
          value={major ?? "Ngành"}
          onChange={(e) => handleMajorChange(e)}
        >
          <MenuItem value="Ngành" disabled>
            <Text fontSize="14px">Ngành</Text>
          </MenuItem>
          {data?.map((item) => (
            <MenuItem
              key={item.id}
              value={item.categoryName}
              onClick={() => setMajorID(item.id)}
            >
              <Text fontSize="14px">{item.categoryName}</Text>
            </MenuItem>
          ))}
        </Select>
        {major === undefined && <FormHelperText>Trống</FormHelperText>}
      </FormControl>
      <FormControl error={semester === undefined && true}>
        <Select
          sx={{ height: "30px", pr: "5px" }}
          IconComponent={KeyboardArrowDownIcon}
          value={semester ?? "Kỳ"}
          onChange={(e) => handleSemesterChange(e)}
          disabled={!major}
        >
          <MenuItem value="Kỳ" disabled>
            <Text fontSize="14px">Kỳ</Text>
          </MenuItem>
          {data
            ?.find((item) => item.categoryName === major)
            ?.childCategories?.map((item) => (
              <MenuItem
                key={item.id}
                value={item.categoryName}
                onClick={() => setSemesterID(item.id)}
              >
                <Text fontSize="14px">{item.categoryName}</Text>
              </MenuItem>
            ))}
        </Select>
        {semester === undefined && major && (
          <FormHelperText>Trống</FormHelperText>
        )}
      </FormControl>
      <FormControl error={subject === undefined && true}>
        <Select
          sx={{ height: "30px", pr: "5px" }}
          IconComponent={KeyboardArrowDownIcon}
          value={subject ?? "Môn"}
          onChange={(e) => setSubject(e.target.value)}
          disabled={!semester}
        >
          <MenuItem value="Môn" disabled>
            <Text fontSize="14px">Môn</Text>
          </MenuItem>
          {data
            ?.find((item) => item.categoryName === major)
            ?.childCategories?.find((item) => item.categoryName === semester)
            ?.childCategories?.map((item) => (
              <MenuItem
                key={item.id}
                value={item.categoryName}
                onClick={() => setSubjectID(item.id)}
              >
                <Text fontSize="14px">{item.categoryName}</Text>
              </MenuItem>
            ))}
        </Select>
        {subject === undefined && semester && (
          <FormHelperText>Trống</FormHelperText>
        )}
      </FormControl>
      <FormControl error={tag === undefined && true}>
        <Select
          sx={{ height: "30px", pr: "5px" }}
          IconComponent={KeyboardArrowDownIcon}
          value={tag ?? "Thẻ"}
          onChange={(e) => setTag(e.target.value)}
          disabled={!subject}
        >
          <MenuItem value="Thẻ" disabled>
            <Text fontSize="14px">Thẻ</Text>
          </MenuItem>
          {tagList?.map((tag) => (
            <MenuItem value={tag.tagName} onClick={() => setTagID(tag.id)}>
            <Text fontSize="14px">{tag.tagName}</Text>
          </MenuItem>
          ))}
        </Select>
        {tag === undefined && subject && <FormHelperText>Trống</FormHelperText>}
      </FormControl>
    </Stack>
  );
}
