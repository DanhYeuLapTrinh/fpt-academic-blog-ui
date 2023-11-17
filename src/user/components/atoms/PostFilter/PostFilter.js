import React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Text from "../../atoms/Text/Text";
import { FormHelperText, Stack } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
export default function PostFilter(props) {
  let filteredTagList = props.tagList;
  if (props.editQA && props.tag !== "Q&A") {
    filteredTagList = props.tagList?.filter((tag) => tag.tagName !== "Q&A");
  }
  return (
    <Stack
      direction={"row"}
      spacing={1}
      sx={{ padding: "30px 0 20px" }}
      justifyContent={"space-between"}
    >
      <Stack direction={"row"} spacing={1}>
        <FormControl error={props.major === undefined && true}>
          <Select
            sx={{ height: "30px", pr: "5px" }}
            IconComponent={KeyboardArrowDownIcon}
            value={props.major ?? "Ngành"}
            onChange={(e) => props.handleMajorChange(e)}
          >
            <MenuItem value="Ngành" disabled>
              <Text fontSize="14px">Ngành</Text>
            </MenuItem>
            {props.data?.map((item) => (
              <MenuItem key={item.id} value={item.categoryName}>
                <Text fontSize="14px">{item.categoryName}</Text>
              </MenuItem>
            ))}
          </Select>
          {props.major === undefined && <FormHelperText>Trống</FormHelperText>}
        </FormControl>
        <FormControl error={props.semester === undefined && true}>
          <Select
            sx={{ height: "30px", pr: "5px" }}
            IconComponent={KeyboardArrowDownIcon}
            value={props.semester ?? "Kỳ"}
            onChange={(e) => props.handleSemesterChange(e)}
            disabled={!props.major}
          >
            <MenuItem value="Kỳ" disabled>
              <Text fontSize="14px">Kỳ</Text>
            </MenuItem>
            {props.data
              ?.find((item) => item.categoryName === props.major)
              ?.childCategories?.map((item) => (
                <MenuItem key={item.id} value={item.categoryName}>
                  <Text fontSize="14px">{item.categoryName}</Text>
                </MenuItem>
              ))}
          </Select>
          {props.semester === undefined && props.major && (
            <FormHelperText>Trống</FormHelperText>
          )}
        </FormControl>
        <FormControl error={props.subject === undefined && true}>
          <Select
            sx={{ height: "30px", pr: "5px" }}
            IconComponent={KeyboardArrowDownIcon}
            value={props.subject ?? "Môn"}
            onChange={(e) => props.setSubject(e.target.value)}
            disabled={!props.semester}
          >
            <MenuItem value="Môn" disabled>
              <Text fontSize="14px">Môn</Text>
            </MenuItem>
            {props.data
              ?.find((item) => item.categoryName === props.major)
              ?.childCategories?.find(
                (item) => item.categoryName === props.semester
              )
              ?.childCategories?.map((item) => (
                <MenuItem
                  key={item.id}
                  value={item.categoryName}
                  onClick={() => props.setSubjectID(item.id)}
                >
                  <Text fontSize="14px">{item.categoryName}</Text>
                </MenuItem>
              ))}
          </Select>
          {props.subject === undefined && props.semester && (
            <FormHelperText>Trống</FormHelperText>
          )}
        </FormControl>
        <FormControl error={props.tag === undefined && true}>
          <Select
            sx={{ height: "30px", pr: "5px" }}
            IconComponent={KeyboardArrowDownIcon}
            value={props.tag ?? "Thẻ"}
            onChange={(e) => props.setTag(e.target.value)}
            disabled={
              props.editQA && props.tag === "Q&A" ? true : !props.subject
            }
          >
            <MenuItem value="Thẻ" disabled>
              <Text fontSize="14px">Thẻ</Text>
            </MenuItem>
            {filteredTagList?.map((tag) => (
              <MenuItem
                key={tag.id}
                value={tag.tagName}
                onClick={() => props.setTagID(tag.id)}
              >
                <Text fontSize="14px">{tag.tagName}</Text>
              </MenuItem>
            ))}
          </Select>
          {props.tag === undefined && props.subject && (
            <FormHelperText>Trống</FormHelperText>
          )}
        </FormControl>
      </Stack>
    </Stack>
  );
}
