'use client';
import { useState, useEffect } from 'react';
import { PostListOptions } from './PostListOptions';
export const PostList = ({
    postData,
    loading,
    date,
    refetchPosts
}) => {

    const [postInputValues, setPostInputValues] = useState([]);

    const [posts, setPosts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [activePostId, setActivePostId] = useState(null);  
    const [activePostContent, setActivePostContent] = useState(null);
    const [showPostOptions, setShowPostOptions] = useState(false);

    useEffect(() => {
        if (Array.isArray(postData)) {
            setPosts(postData);
            const defaultPostInputValues = postData.map(({ node }) => {
                return { id: node.postId, value: node.title };
            });
            setPostInputValues(defaultPostInputValues);
        }
    }, [postData]);

    const handlePostEditChange = (e, postId) => {
        const updatedPostInputValues = postInputValues.map(post => {
            if (post.id === postId) {
                setShowPostOptions(e.target.value);
                return { ...post, value: e.target.value };
            }
            return post;
        });
        setPostInputValues(updatedPostInputValues);
    }

    const handleInputKeyPress = (e, postId) => {
        if (e.key === 'Enter') {
            setIsEditing('saved');
            setActivePostContent(postInputValues.find(post => post.id === postId).value);
        }
    }

    const handleOptionsButtonClick = (postId) => {
        setActivePostId(postId);
        setShowPostOptions(true);
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
                            <li className="post-list__item" key={node.id}>
                                {!isEditing ? postInputValues.find(post => post.id === node.postId).value : ''}
                                <button className="post-list__item__options-button" onClick={() => { handleOptionsButtonClick(node.postId) }}>...</button>
                                { showPostOptions ?
                                    <PostListOptions
                                        refetchPosts={refetchPosts}
                                        isEditing={isEditing}
                                        setIsEditing={setIsEditing}
                                        activePostId={activePostId}
                                        setActivePostId={setActivePostId}
                                        activePostContent={activePostContent}
                                        setActivePostContent={setActivePostContent}
                                        showPostOptions={showPostOptions}
                                        setShowPostOptions={setShowPostOptions}
                                    />
                                    : ''}
                                { activePostId === node.postId && 'editing' == isEditing ?
                                    <input
                                        value={postInputValues.find(post => post.id === node.postId).value}
                                        onChange={(e) => {
                                            handlePostEditChange(e, node.postId)
                                        }}
                                        onKeyPress={(e) => { handleInputKeyPress(e, node.postId) }}
                                    />
                                    : null}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>)
};
