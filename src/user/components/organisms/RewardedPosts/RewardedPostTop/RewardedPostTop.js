import React from "react";
import PostCardV2 from "../../PostCardV2/PostCardV2";
import RewardBadge from "../../../atoms/RewardBadge/RewardBadge";

export default function RewardedPostTop() {
  return (
    <div style={{ position: "relative" }}>
      <PostCardV2 height="430px" clamp="3" title="32px" />
      <RewardBadge position="absolute" top="15px" right="15px" zIndex="999" small={false}/>
    </div>
  );
}
