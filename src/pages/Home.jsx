import React from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Spinner } from "../components/Spinner";
import { BlogAPI } from "../global/BlogAPI";

export const Home = () => {
    const { error, isError, isLoading, data } = 
        BlogAPI.useFetchAllQuery();
    const [deleteBlog] = BlogAPI.useDeleteMutation();

    React.useEffect(() => {
        isError && toast.error(error);
    }, [isError]);

    if (isLoading) return <Spinner />;

    const excerpt = (string, count) => {
        if (string.length > count) {
            string = string.substring(0, count) + " ...";
        };
        return string;
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete the Item?"));
        await deleteBlog(id);
        toast.success("The Blog was deleted!");
    };

    return (
        <main className="main">
            {data?.map((item) => (
                <section key={item.id}>
                    <aside>
                        <img 
                            className="main__img"
                            src={item.imgURL} 
                            alt={item.title} 
                        />
                    </aside>
                    <aside>
                        <h2>{item.title}</h2>
                        {excerpt(item.description, 80)}
                    </aside>
                    <aside>
                        <Link 
                            to={`/detail/${item.id}`}
                            >Read More
                        </Link>
                    </aside>                    
                </section>                
            ))}
        </main>
    );
};



