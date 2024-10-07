'use client';
import { useState, useEffect } from 'react';
import { PostListItem } from './post-list-item/PostListItem';
import { useMutation } from '@apollo/client';
import { CREATE_BLANK_POST } from '@/graphql/mutations';
import { formatDateToWP } from '@/lib/calendar';

export const PostList = ({
    postData,
    loading,
    date,
    refetchPosts,
}) => {
    const [postInputValues, setPostInputValues] = useState([]);
    const [posts, setPosts] = useState([]);
    const [createBlankPost] = useMutation(CREATE_BLANK_POST);
    const [addingImage, setAddingImage] = useState(false);

    useEffect(() => {
        if (Array.isArray(postData)) {
            setPosts(postData);
            const defaultPostInputValues = postData.map(({ node }) => {
                let content = node?.content?.length == ' ' ? 'Click to write here...' : node?.content;
                if (content) {
                    content = content.replace(/<[^>]*>/g, '');
                }
                return { id: node.postId, value: content };
            });
            setPostInputValues(defaultPostInputValues);
        }
    }, [postData]);

    const addNewBlankPost = async ( postFormat ) => {
        if ( !postFormat ) {
            postFormat = 'standard';
        }
    
        const newPost = await createBlankPost({
            variables: {
                input: {
                    date: formatDateToWP(date),
                    title: formatDateToWP(date),
                    content: " ",
                    status: "PRIVATE",
                    postFormats: {
                        append: false,
                        nodes: [
                            { name: postFormat }
                        ]
                    }
                }
            }
        });
        await refetchPosts();
        const newPostId = newPost?.data?.createPost?.post?.postId;
        return newPostId;
    }

    const addNewBlankLink = async () => {}

    const addNewBlankImage = async () => {
        const newPostId = await addNewBlankPost('image');
        setAddingImage(newPostId);
    }

    return (
        <>
            <div className="post-list">
                {loading && posts ? (
                    <p className="post-list__date">{date.toDateString()} Loading...</p>
                ) : (
                    <>
                        <p className="post-list__date">{date.toDateString()}</p>
                        <ul className="post-list__items">
                            {!loading && posts?.length <= 0 && (
                                <li className="not-found">No posts found.</li>
                            )}
                            {posts.map(({ node }) => (
                                <PostListItem
                                    key={node.postId}
                                    post={node}
                                    postInputValues={postInputValues}
                                    setPostInputValues={setPostInputValues}
                                    addingImage={addingImage}
                                    setAddingImage={setAddingImage}
                                    refetchPosts={refetchPosts}
                                />
                            ))}
                        </ul>
                    </>
                )}
            </div>
            <div className="post-list__actions">
                <button onClick={()=>addNewBlankPost('standard')}>Add Text</button>
                <button onClick={addNewBlankImage}>Add Image</button>
                <button onClick={addNewBlankLink}>Add Link </button>
            </div>
        </>
    )
};
