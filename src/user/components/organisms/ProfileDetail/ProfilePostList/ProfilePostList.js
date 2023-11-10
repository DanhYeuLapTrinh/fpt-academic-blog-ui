import React from "react";
import Text from "../../../atoms/Text/Text";
import ProfilePost from "../../ProfilePost/ProfilePost";
import { Stack } from "@mui/material";
import { Icon } from "@iconify/react";

export default function ProfilePostList(props) {
  return (
    <>
      <Text fontSize="23px">Bài viết</Text>
      {props?.postList?.length > 0 ? (
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
            slug={item.slug}
            title="22px"
            small
          />
        ))
      ) : (
        <Stack justifyContent={"center"} alignItems={"center"} height={"100%"}>
          <Stack alignItems={"center"} spacing={1}>
            <Icon
              icon="mdi:border-none-variant"
              color="#c3c3c3"
              width="50"
              height="50"
            />
            <Text color="lightText.main">Chưa có bài viết nào được đăng</Text>
          </Stack>
        </Stack>
      )}
    </>
  );
}
