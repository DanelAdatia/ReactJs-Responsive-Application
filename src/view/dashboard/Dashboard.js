import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Feed from "../feed/Feed";
import PieChart from "../../components/PieChart";
import { MyContext } from "../../contexts/UserContext";

const Dashboard = () => {
  const { posts } = useContext(MyContext);

  const sharedPostsCount = posts.filter((post) => post.message).length;
  const newPostsCount = posts.filter((post) => !post.message).length;
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [welcomeMessageIndex, setWelcomeMessageIndex] = useState(0);
  const welcomeMessageText = "Welcome to your dashboard!";

  useEffect(() => {
    const interval = setInterval(() => {
      setWelcomeMessage(welcomeMessageText.slice(0, welcomeMessageIndex));
      setWelcomeMessageIndex((prevIndex) =>
        prevIndex < welcomeMessageText.length ? prevIndex + 1 : 0
      );
    }, 300);
    return () => clearInterval(interval);
  }, [welcomeMessageIndex]);

  return (
    <div className="flex flex-col w-full items-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">
        {welcomeMessage}&nbsp;
        <span className="inline-flex animate-pulse">|</span>
      </h1>
      <Link
        to="/create-post"
        className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-200 mb-8 border-4 border-sky-300"
      >
        Create Post
      </Link>
      <div className="flex flex-wrap w-full justify-between">
        <div className="w-full md:w-2/3 lg:w-3/4 px-4">
          <Feed />
        </div>
        <div className="w-full md:w-1/3 lg:w-1/4 px-4">
          <div className="bg-white p-4 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Posts Overview
            </h2>
            <PieChart
              sharedPostsCount={sharedPostsCount}
              newPostsCount={newPostsCount}
            />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Stats Overview
            </h2>
            <div className="flex justify-between mb-4">
              <div className="text-gray-800">
                <div className="text-3xl font-bold">98%</div>
                <div>Engagement Rate</div>
              </div>
              <div className="text-gray-800">
                <div className="text-3xl font-bold">23K</div>
                <div>Followers</div>
              </div>
              <div className="text-gray-800">
                <div className="text-3xl font-bold">10K</div>
                <div>Likes</div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                View More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
