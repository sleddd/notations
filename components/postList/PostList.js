'use client';
import { useState, useEffect } from 'react';
import { PostListItem } from './PostListItem';
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

    useEffect(() => {
        if (Array.isArray(postData)) {
            setPosts(postData);
            const defaultPostInputValues = postData.map(({ node }) => {
                let content = node.content.length == ' ' ? 'Click to write here...' : node.content;
                if (content) {
                    content = content.replace(/<[^>]*>/g, '');
                }
                return { id: node.postId, value: content };
            });
            setPostInputValues(defaultPostInputValues);
        }
    }, [postData]);

    const addNewBlankPost = async () => {
        await createBlankPost({
            variables: {
                input: {
                    date: formatDateToWP(date),
                    title: formatDateToWP(date),
                    content: " ",
                    status: "PRIVATE",
                    postFormats: {
                        append: false,
                        nodes: [
                          { name: "standard" }
                        ]
                    }
                }
            }
        });
        await refetchPosts();
    }

    const addNewBlankLink = async () => { }

    const addNewBlankImage = async () => { }

    return (
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
                                refetchPosts={refetchPosts}
                            />
                        ))}
                    </ul>
                    <div className="post-list__items__new">
                        <span>New:</span>
                        <button onClick={addNewBlankPost}>Text</button>
                        <button onClick={addNewBlankImage}>Image</button>
                        <button onClick={addNewBlankLink}>Link</button>
                    </div>
                </>
            )}
        </div>)
};
