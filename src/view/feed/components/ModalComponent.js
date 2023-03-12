import React from "react";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import Image from "../../../components/Image";
import { Form, FormikProvider } from "formik";
import { useForm } from "../../../hooks/UseForm";
import { ShareThePost } from "../../../api/FeedPost";
import { useSnackbar } from "notistack";

const ModalComponent = ({ post, isOpen, onClose, setPosts }) => {
  const { enqueueSnackbar } = useSnackbar();
  const handleShare = async (values) => {
    console.log(post, "post");
    console.log(post.shareCount, "post.shareCount.shareCountst");

    try {
      const sharedPost = {
        ...post,
        id: window.location.pathname.split("/")[2],
        message: values.message,
        shareCount: post.shareCount + 1,
        likes: 0,
        comment: [],
      };
      const res = await ShareThePost(sharedPost);
      setPosts((prev) => [...prev, res.data]);
      onClose();
      enqueueSnackbar("Post shared successfully!", {
        variant: "success",
        autoHideDuration: 3000,
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const initialValues = {
    message: "",
  };

  const formik = useForm(initialValues, (values) => {
    handleShare(values);
  });

  const { handleSubmit, values, handleChange } = formik;

  return (
    <FormikProvider value={formik}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="flex flex-col items-center space-y-4 p-4">
          <h1 className="text-xl font-semibold text-black-700">{post.title}</h1>
          <hr className="w-full border-purple-700 mt-2 mb-4" />
          <div className="w-full space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                className="w-8 h-8 rounded-full"
                src={post.image}
                alt={post.author}
              />
              <div>
                <span className="text-lg font-semibold">{post.author}</span>
                <span className="text-gray-500 pl-2">{post.date}</span>
              </div>
            </div>

            <p className="text-lg">{post.content}</p>
          </div>
          <Form onSubmit={handleSubmit} className="w-full">
            <textarea
              className="w-full h-32 p-2 bg-gray-100 rounded-lg border border-gray-300"
              placeholder="Write something..."
              name="message"
              value={values.message}
              onChange={handleChange}
            />
            <Button
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              label="Share"
              type="submit"
            />
          </Form>
        </div>
      </Modal>
    </FormikProvider>
  );
};

export default ModalComponent;
