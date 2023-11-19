import React from "react";
import PostCardV2 from "../../PostCardV2/PostCardV2";
import PostCardV2Skeleton from "../../Skeleton/PostCardV2Skeleton/PostCardV2Skeleton";

export default function RewardedPostTop(props) {
  return (
    <div>
      {!props?.rewardedPosts?.length > 0 ? (
        <PostCardV2Skeleton height={430} />
      ) : (
        <PostCardV2
          url={props.rewardedPosts[0]?.coverURL}
          src={props.rewardedPosts[0]?.avatarURL}
          label={props.rewardedPosts[0]?.accountName}
          time={props.rewardedPosts[0]?.dateOfPost}
          postTitle={props.rewardedPosts[0]?.title}
          description={props.rewardedPosts[0]?.description}
          majorName={props?.rewardedPosts[0]?.category[0]?.categoryName}
          majorID={props?.rewardedPosts[0].category[0]?.categoryId}
          subjectName={props?.rewardedPosts[0]?.category[2]?.categoryName}
          subjectID={props?.rewardedPosts[0].category[2]?.categoryId}
          tagName={props?.rewardedPosts[0]?.tag.tagName}
          tagID={props?.rewardedPosts[0]?.tag.tagId}
          isRewarded={props.rewardedPosts[0]?.is_rewarded}
          slug={props.rewardedPosts[0]?.slug}
          userId={props.rewardedPosts[0]?.userId}
          rewarder={props.rewardedPosts[0]?.rewarder}
          height="430px"
          clamp="3"
          title="32px"
          small={false}
        />
      )}
    </div>
  );
}
