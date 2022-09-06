import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./container/HomePage";
import ItemPage from "./container/ItemPage";
import { firebaseConfig } from "./api";
import firebase from "firebase/compat/app"; //v9
import menu from "./data";
// These imports load individual services into the firebase namespace.
import "firebase/auth";
import "firebase/database";
import { fetchAllItems } from "./redux/action";
import { useDispatch } from "react-redux";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllItems());
  }, []);
  const app = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();
  const db = app.firestore;
  const auth = app.auth;
  const storage = firebase.storage;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/item" element={<ItemPage />} />
        <Route path="/item/:id" element={<ItemPage />} />
        <Route
          path="*"
          element={<div style={{ alignContent: "center" }}>Ops! </div>}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
