import React, { useEffect, useState } from "react";
import PostInteraction from "./PostInteraction";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export default function PostInteractionService(props) {
  const axiosPrivate = useAxiosPrivate();
  const [vote, setVote] = useState(props.vote);
  // check xem vote gì trước up down ""
  const [select, setSelect] = useState("");
  // check xem đã vote chưa true false
  const [voted, setVoted] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axiosPrivate.post(
          process.env.REACT_APP_CHECK_VOTE,
          {
            postId: props.postId,
          }
        );
        if (response?.data) {
          if (response?.data[0]?.typeOfVote === "up") {
            setSelect("up");
            setVoted(true);
          } else if (response?.data[0]?.typeOfVote === "down") {
            setSelect("down");
            setVoted(true);
          }
        }
      } catch (error) {}
    };
    if (vote) fetchData();
  }, [vote]);

  const handleUpvote = async () => {
    try {
      if (!voted) {
        await axiosPrivate.post(process.env.REACT_APP_ADD_VOTE, {
          postId: props.postId,
          typeOfVote: "up",
        });
        setSelect("up");
        setVoted(true);
        setVote(vote + 1);
      } else if (select === "up") {
        await axiosPrivate.post(process.env.REACT_APP_REMOVE_VOTE, {
          postId: props.postId,
        });
        setSelect("");
        setVoted(false);
        setVote(vote - 1);
      } else if (select === "down") {
        await axiosPrivate.post(process.env.REACT_APP_REMOVE_VOTE, {
          postId: props.postId,
        });
        await axiosPrivate.post(process.env.REACT_APP_ADD_VOTE, {
          postId: props.postId,
          typeOfVote: "up",
        });
        setSelect("up");
        setVoted(true);
        setVote(vote + 2);
      }
    } catch (error) {}
  };

  const handleDownvote = async () => {
    try {
      if (!voted) {
        await axiosPrivate.post(process.env.REACT_APP_ADD_VOTE, {
          postId: props.postId,
          typeOfVote: "down",
        });
        setSelect("down");
        setVoted(true);
        setVote(vote - 1);
      } else if (select === "down") {
        await axiosPrivate.post(process.env.REACT_APP_REMOVE_VOTE, {
          postId: props.postId,
        });
        setSelect("");
        setVoted(false);
        setVote(vote + 1);
      } else if (select === "up") {
        await axiosPrivate.post(process.env.REACT_APP_REMOVE_VOTE, {
          postId: props.postId,
        });
        await axiosPrivate.post(process.env.REACT_APP_ADD_VOTE, {
          postId: props.postId,
          typeOfVote: "down",
        });
        setSelect("down");
        setVoted(true);
        setVote(vote - 2);
      }
    } catch (error) {}
  };
  return (
    <PostInteraction
      vote={vote}
      select={select}
      setSelect={setSelect}
      handleUpvote={handleUpvote}
      handleDownvote={handleDownvote}
    />
  );
}
