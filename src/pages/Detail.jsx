import React from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { BlogAPI } from "../global/BlogAPI";

export const Detail = () => {
    const { id } = useParams();
    const { error, isError, data: blog } = 
        BlogAPI.useGetOneQuery(id ? id : skipToken);

    React.useEffect(() => {
        isError && toast.error(error);
    }, [isError]);

    return (
        <main className="detail">
            <img
                className="detail__img" 
                src={blog?.imgURL} 
                alt={blog?.title} 
            />
            <section className="detail__body">
                <title className="detail__title">
                    {blog?.title}
                </title>
                <section className="detail__text">
                    <span>Created at - &nbsp;</span>
                    <small>
                        {blog?.timestamp.toDate()
                            .toLocaleString()}
                    </small>
                </section>
                <section>
                    <p>{blog?.description}</p>
                </section>
            </section>
        </main>
    );
};



