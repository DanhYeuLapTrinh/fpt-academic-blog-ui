import React, { useState, useEffect } from "react";
import Text from "../../../atoms/Text/Text";
import ProfilePost from "../../ProfilePost/ProfilePost";
import { MenuItem, Select, Stack } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Icon } from "@iconify/react";
import useAuth from "../../../../hooks/useAuth";
export default function ProfilePostList(props) {
  const [type, setType] = useState("Bài viết của tôi");
  const auth = useAuth();
  useEffect(() => {
    return () => setType("Bài viết của tôi");
  }, []);
  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Text fontSize="23px">Bài viết</Text>
        {props.userId === auth.id && (
          <>
            <Select
              sx={{ height: "30px", pr: "5px" }}
              IconComponent={KeyboardArrowDownIcon}
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value="Bài viết của tôi">
                <Text fontSize="14px">Bài viết của tôi</Text>
              </MenuItem>
              <MenuItem value="Bài viết đang chờ">
                <Text fontSize="14px">Bài viết đang chờ</Text>
              </MenuItem>
            </Select>
          </>
        )}
      </Stack>
      {type === "Bài viết của tôi" &&
        props?.postList?.map((item, index) => (
          <ProfilePost
            key={index}
            url={item.coverURL}
            isRewarded={item.is_rewarded}
            postTitle={item.title}
            description={item.description}
            majorName={item?.category[0]?.categoryName}
            majorID={item?.category[0]?.categoryId}
            subjectName={item?.category[2]?.categoryName}
            subjectID={item?.category[2]?.categoryId}
            tagName={item?.tag.tagName}
            tagID={item?.tag.tagId}
            time={item.dateOfPost}
            link={`/view/${item.slug}`}
            title="22px"
            small
          />
        ))}
      {type === "Bài viết đang chờ" &&
        props?.pendingPostList?.map((item, index) => (
          <ProfilePost
            key={index}
            url={item.coverURL}
            isRewarded={item.is_rewarded}
            postTitle={item.title}
            description={item.description}
            majorName={item?.category[0]?.categoryName}
            majorID={item?.category[0]?.categoryId}
            subjectName={item?.category[2]?.categoryName}
            subjectID={item?.category[2]?.categoryId}
            tagName={item?.tag.tagName}
            tagID={item?.tag.tagId}
            time={item.dateOfPost}
            link={`/edit/${item?.slug}`}
            title="22px"
            small
          />
        ))}
      {!props?.pendingPostList?.length > 0 && type === "Bài viết đang chờ" && (
        <Stack justifyContent="center" alignItems="center" height="100%">
          <Stack alignItems="center" spacing={1}>
            <Icon
              icon="mdi:border-none-variant"
              color="#c3c3c3"
              width="50"
              height="50"
            />
            <Text color="lightText.main">
              Chưa có bài viết nào trong danh sách chờ
            </Text>
          </Stack>
        </Stack>
      )}
      {!props?.postList?.length > 0 && type === "Bài viết của tôi" && (
        <Stack justifyContent="center" alignItems="center" height="100%">
          <Stack alignItems="center" spacing={1}>
            <Icon
              icon="mdi:border-none-variant"
              color="#c3c3c3"
              width="50"
              height="50"
            />
            <Text color="lightText.main">
              Người dùng chưa đăng bài nào
            </Text>
          </Stack>
        </Stack>
      )}
    </>
  );
}
