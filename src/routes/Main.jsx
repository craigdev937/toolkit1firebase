import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Home } from "../pages/Home";
import { Detail } from "../pages/Detail";
import { AddEdit } from "../pages/AddEdit";

export const Main = () => {
    return (
        <BrowserRouter>
            <React.Fragment>
                <Navbar />
                <ToastContainer position="top-center" />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/add" element={<AddEdit />} />
                    <Route path="/update/:id" element={<AddEdit />} />
                    <Route path="/detail/:id" element={<Detail />} />
                </Routes>
            </React.Fragment>
        </BrowserRouter>
    );
};


