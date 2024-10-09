'use client';
import { useState, useEffect } from 'react';
import { PostListItem } from './post-list-item/PostListItem';
import { ImageEditField } from './post-list-item/edit-fields/imageEditField';
import { TextEditField } from './post-list-item/edit-fields/textEditField';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import LinkIcon from '@mui/icons-material/Link';
import TextFieldsIcon from '@mui/icons-material/TextFields';

export const PostList = ({
    postData,
    loading,
    date,
    refetchPosts,
}) => {
    const [postInputValues, setPostInputValues] = useState([]);
    const [posts, setPosts] = useState([]);
    const [addPostAction, setAddPostAction] = useState('text');

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
                            <li className="post-list__item">
                                {addPostAction == 'image' && <ImageEditField
                                    placeholder="Click to begin writing here..."
                                    refetchPosts={refetchPosts}
                                    date={date}
                                />}
                                {addPostAction == 'text' && <TextEditField
                                    placeholder="Click to begin writing here..."
                                    newItem="text"
                                    refetchPosts={refetchPosts}
                                    date={date}
                                />}
                                {addPostAction == 'link' && <TextEditField
                                    placeholder="Add your link her..."
                                    newItem="link"
                                    refetchPosts={refetchPosts}
                                    date={date}
                                />}
                                <div className="post-list__item--actions post-list__item--actions--new">
                                    Switch to Add:
                                    <ul className={`post-list__item__signifiers`}>
                                        <li className="post-list__item__signifiers__item">
                                            <TextFieldsIcon onClick={() => setAddPostAction('text')} />
                                        </li>
                                        <li className="post-list__item__signifiers__item">
                                            <PhotoCameraIcon onClick={() => setAddPostAction('image')} />
                                        </li>
                                        <li className="post-list__item__signifiers__item">
                                            <LinkIcon onClick={() => setAddPostAction('link')} />
                                        </li>
                                    </ul>
                                </div>
                            </li>
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
                    </>
                )}
            </div>
        </>
    )
};
