import React from "react";
import PostCardV2 from "../../PostCardV2/PostCardV2";
import RewardBadge from "../../../atoms/RewardBadge/RewardBadge";
import { getFirstChar } from "../../../../utils/StringMethod";

export default function RewardedPostTop(props) {

  return (
    <div>
      {props.rewardedPosts && (
        <PostCardV2
          url={props.rewardedPosts[0]?.coverURL}
          src={props.rewardedPosts[0]?.avatarURL}
          label={props.rewardedPosts[0]?.accountName}
          time={props.rewardedPosts[0]?.dateOfPost}
          postTitle={props.rewardedPosts[0]?.title}
          description={props.rewardedPosts[0]?.description}
          major={getFirstChar(props.rewardedPosts[0]?.category[0])}
          subject={props.rewardedPosts[0]?.category[1]}
          tag={props.rewardedPosts[0]?.tag}
          isRewarded={props.rewardedPosts[0]?.is_rewarded}
          height="430px"
          clamp="3"
          title="32px"
          small={false}
        />
      )}
    </div>
  );
}
