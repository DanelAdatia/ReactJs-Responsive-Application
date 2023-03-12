import React, { useContext, useState } from "react";
import Image from "../../../components/Image";
import Button from "../../../components/Button";
import ModalComponent from "./ModalComponent";
import { CommentPost, DeletePost, LikePost } from "../../../api/FeedPost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faTrash } from "@fortawesome/free-solid-svg-icons";
import { MyContext } from "../../../contexts/UserContext";
import { useSnackbar } from "notistack";
import BarChart from "../../../components/BarChart";

const FeedPost = ({ post }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [openModal, setOpenModal] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [comments, setComments] = useState(post.comment);
  const [commentsCount, setCommentsCount] = useState(post.comment.length);
  const { posts, setPosts } = useContext(MyContext);
  const [showAnalytics, setShowAnalytics] = useState(false);

  const handleLike = async () => {
    try {
      const response = await LikePost(
        {
          likes: likeCount + 1,
        },
        post.id
      );
      setLikeCount(response.data.likes);
    } catch (error) {
      console.error(error);
    }
  };

  const handleComment = async () => {
    try {
      const comment = prompt("Enter your comment:");
      if (comment) {
        const newComments = [...comments, comment];
        const response = await CommentPost(
          {
            comment: newComments,
          },
          post.id
        );
        setComments(response.data.comment);
        setCommentsCount(response.data.comment.length);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onDelete = async () => {
    try {
      await DeletePost(post.id);
      setPosts(posts.filter((e) => e.id !== post.id));
      enqueueSnackbar("Post deleted successfully!", {
        variant: "success",
        autoHideDuration: 3000,
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white border-2 border-sky-00 rounded-lg shadow-lg p-4 mb-4 hover:shadow-2xl">
      <p className="text-lg font-bold mb-4 text-center">{post.message}</p>
      <div
        className={`${
          post.message ? "border border-yellow-300 rounded-lg p-4 mb-4" : ""
        }`}
      >
        <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
        <div className="flex items-center justify-between mb-2">
          <Image
            className="w-12 h-12 rounded-full mr-4"
            src={post.image}
            alt={post.title}
          />

          <div className="flex flex-col flex-grow">
            <div
              className={`text-lg font-semibold ${
                post.message ? "text-yellow-500" : ""
              }`}
            >
              {post.author}
            </div>
            <div className="text-gray-500">{post.date}</div>
          </div>
          <div
            className="mr-10 cursor-pointer"
            onClick={() => setShowAnalytics(!showAnalytics)}
          >
            <FontAwesomeIcon color="blue" icon={faChartLine} />
          </div>

          {showAnalytics && (
            <div className="mt-4">
              <BarChart
                likeCount={likeCount}
                commentsCount={commentsCount}
                shareCount={post.shareCount}
              />
            </div>
          )}

          {!showAnalytics && (
            <div onClick={() => onDelete(post.id)}>
              <FontAwesomeIcon
                className="cursor-pointer"
                color="red"
                icon={faTrash}
              />
            </div>
          )}
        </div>

        <p className="text-lg mb-4">{post.content}</p>

        {post.comment.length > 0 && (
          <div className="border border-gray-300 rounded-lg p-4 mb-4">
            <h3 className="font-semibold mb-2">Comments:</h3>
            {comments.map((comment, index) => (
              <div key={index} className="mb-2 pb-2 border-b">
                <p key={index} className="mb-2">
                  {comment}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end">
          <Button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            label={`Like ${likeCount}`}
            onClick={handleLike}
          />
          <Button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg ml-4 hover:bg-gray-400"
            label={`Comment (${commentsCount})`}
            onClick={handleComment}
          />

          <Button
            className={`${
              post.message ? "bg-yellow-400" : "bg-green-500"
            } text-black-700 px-4 py-2 rounded-lg ml-4 hover:${
              post.message ? "bg-yellow-500" : "bg-green-600"
            }`}
            label="Share"
            onClick={() => setOpenModal(true)}
          />
          <ModalComponent
            post={post}
            setPosts={setPosts}
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default FeedPost;
