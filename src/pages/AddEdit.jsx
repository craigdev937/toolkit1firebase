import React from "react";
import { toast } from "react-toastify";
import { storage } from "../config/firebase";
import { useNavigate, useParams } from "react-router-dom";
import { BlogAPI } from "../global/BlogAPI";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { ref, uploadBytesResumable, 
    getDownloadURL } from "firebase/storage";

export const AddEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = React.useState({
        title: "", description: ""
    });
    const [file, setFile] = React.useState(null);
    const [progress, setProgress] = React.useState(null);
    const [addBlog] = BlogAPI.useAddMutation();
    const [updateBlog] = BlogAPI.useUpdateMutation();
    const { data: blog } = 
        BlogAPI.useGetOneQuery(id ? id : skipToken);
    const { title, description } = data;

    React.useEffect(() => {
        if (id && blog) {
            setData({...blog});
        }
    }, [id, blog]);

    React.useEffect(() => {
        const uploadFile = () => {
            const storageRef = ref(storage, file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on("state_changed", (snapshot) => {
                const progress = (snapshot.bytesTransferred 
                    / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                setProgress(progress);
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                        break;
                };
            }, (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadURL) => {
                    toast.info("Image Upload Success!");
                    setData((prev) => ({
                        ...prev, imgURL: downloadURL
                    }));
                })
            });
        };
        file && uploadFile();
    }, [file]);

    const handleChange = (event) => {
        setData({...data, 
            [event.target.name]: event.target.value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (title && description) {
            if (!id) {
                await addBlog(data);
                toast.success("The Blog was added!");
                navigate("/");
            } else {
                await updateBlog({id, data});
                toast.success("The Blog was updated!");
                navigate("/");
            }
        }
    };

    return (
        <main className="addEdit">
            <h4 className="fw-bold"
                >{id ? "Update Blog" : "Create Blog"}
            </h4>
            <section className="body">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Title</label>
                    <aside>
                        <input 
                            type="text" 
                            name="title"
                            value={data.title}
                            onChange={handleChange}
                        />
                    </aside>
                    <label htmlFor="description">Description</label>
                    <aside>
                        <textarea 
                            type="text" 
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                        />
                    </aside>
                    <aside>
                        <input 
                            type="file" 
                            id="upload"
                            onChange={(event) => 
                                setFile(event.target.files[0])}    
                        />
                    </aside>
                    <button 
                        className="addEdit__btn"
                        type="submit"
                        disabled={progress !== 
                            null && progress < 100}
                        >{id ? "Update" : "Submit"}
                    </button>
                </form>
            </section>
        </main>
    );
};



