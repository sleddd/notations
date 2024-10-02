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
    const [posts, setPosts]                     = useState([]);
    const [createBlankPost]                     = useMutation(CREATE_BLANK_POST);

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
        // Save blank post with the post date as publish date and title.
        const test = await createBlankPost({
            variables: {
                input: {
                    date: formatDateToWP(date),
                    title: formatDateToWP(date),
                    content: " ",
                    status: "PRIVATE"
                }
            }
        });
        refetchPosts();
    }

    return (
        <div className="post-list">
            {loading && posts ? (
                <p>{date.toDateString()} Loading...</p>
            ) : (
                <>
                    <p>{date.toDateString()}</p>
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
                        <button onClick={addNewBlankPost}>+ New Item</button>
                    </ul>
                </>
            )}
        </div>)
};
