import React, { useContext } from "react";
import axios from "axios";
import { Form, Field, ErrorMessage, FormikProvider } from "formik";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/UseForm";
import { useSnackbar } from "notistack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { MyContext } from "../../contexts/UserContext";

const CreatePost = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { setPosts } = useContext(MyContext);

  const handleSubmitt = async (values, { setSubmitting }) => {
    try {
      const postId = window.location.pathname.split("/")[2];
      values.postId = postId;
      const response = await axios.post("http://localhost:3000/posts", values);
      console.log(response.data);
      setSubmitting(false);
      enqueueSnackbar("Post created successfully!", {
        variant: "success",
        autoHideDuration: 3000,
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
        },
      });

      setPosts((prev) => [...prev, response.data]);
      resetForm();
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Failed to create post!", {
        variant: "error",
        autoHideDuration: 3000,
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
        },
      });
    }
  };

  const initialValues = {
    title: "",
    content: "",
    author: "",
    date: new Date().toISOString().substr(0, 10),
    image: "",
    likes: 0,
    comment: [],
  };
  const formik = useForm(initialValues, handleSubmitt);
  const { resetForm } = formik;

  const { isSubmitting } = formik;
  return (
    <>
      <div className="flex justify-center items-start">
        <Link
          to="/"
          className="bg-emerald-500 text-black px-2 py-2 rounded-lg hover:bg-emerald-200"
        >
          <FontAwesomeIcon icon={faArrowLeft} color="black" className="mr-5" />
          Back to Dashboard
        </Link>
      </div>
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-md mx-auto border-2 p-10 border-emerald-300">
          <header>
            <h1 className="text-2xl font-bold mb-4">Create Post</h1>
          </header>
          <FormikProvider value={formik}>
            <Form>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="title"
                >
                  Title
                </label>
                <Field
                  className="border border-gray-400 p-2 w-full"
                  type="text"
                  id="title"
                  name="title"
                  required
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="content"
                >
                  Content
                </label>
                <Field
                  className="border border-gray-400 p-2 w-full"
                  component="textarea"
                  id="content"
                  name="content"
                  rows="5"
                  required
                />
                <ErrorMessage
                  name="content"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="image"
                >
                  Image
                </label>

                <Field
                  className="border border-gray-400 p-2 w-full"
                  type="text"
                  id="image"
                  name="image"
                  required
                  placeholder="Image"
                />
              </div>
              <div className="flex justify-end">
                <Button
                  className="bg-emerald-900 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  label="Create Post"
                  type="submit"
                  disabled={isSubmitting}
                />
              </div>
            </Form>
          </FormikProvider>
        </div>
      </div>
    </>
  );
};

export default CreatePost;

// https://picsum.photos/id/1025/536/354
// https://picsum.photos/id/1041/536/354
// https://picsum.photos/id/1055/536/354
// https://picsum.photos/id/1066/536/354
// https://picsum.photos/id/107/536/354
