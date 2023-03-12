import React from "react";
import { BrowserRouter, Route, Routes as Routess } from "react-router-dom";
import Dashboard from "../view/dashboard/Dashboard";
import CreatePost from "../view/createPost/CreatePost";

const Routes = () => {
  return (
    <BrowserRouter>
      <Routess>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routess>
    </BrowserRouter>
  );
};

export default Routes;
