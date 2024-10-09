
import { forwardRef, useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_POST, CREATE_POST } from '@/graphql/mutations';
import { formatDateToWP } from '@/lib/calendar';

export const TextEditField = forwardRef(({
    value,
    placeholder,
    postId,
    postInputValues,
    setPostInputValues,
    refetchPosts,
    setIsEditing,
    setActivePostContent,
    setShowPostOptions,
    setShowPostOptionButton,
    setActivePostId,
    newItem,
    date,
}, ref) => {
    const [updatePost] = useMutation(UPDATE_POST);
    const [createPost] = useMutation(CREATE_POST);
    const [textValue, setTextValue] = useState('');

    const addNewPost = async (postFormat) => {
        if (!postFormat) {
            postFormat = 'standard';
        }
        if ('text' === postFormat) {
            postFormat = 'standard';
        }
        if ('link' === postFormat) {
            postFormat = 'link';
        }

        const newPost = await createPost({
            variables: {
                input: {
                    date: formatDateToWP(date),
                    title: formatDateToWP(date),
                    content: textValue,
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

    const handlePostEditChange = (e) => {
        if (newItem) {
            if ('text' === newItem || 'link' === newItem) {
                // New item, just set the state for value.
                setTextValue(e.target.value);
            }
        } else {
            // Editing a post - change post content value.
            const updatedPostInputValues = postInputValues.map(post => {
                if (post.id === postId) {
                    return { ...post, value: e.target.value };
                }
                return post;
            });
            setPostInputValues(updatedPostInputValues);
        }
    }

    const handleInputKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            if (newItem) {
                if ('text' === newItem || 'link' === newItem) {
                    // New item, add new post.
                    addNewPost('text');
                    setTextValue('');
                }
            } else {
                // Editing a post - change post content value.
                const postValue = postInputValues.find(post => post.id === postId).value;
                updatePost({
                    variables: {
                        input: {
                            id: postId,
                            content: postValue.replace(/<[^>]*>/g, '')
                        }
                    }
                });
                // Reset default post list options/state values.
                setIsEditing(false);
                setActivePostContent('');
                setActivePostId(null);
                setShowPostOptions(false);
                setShowPostOptionButton(true);
            }
            refetchPosts();
        }
        if (e.key === 'Escape') {
            if (!newItem) {
                // Reset default post list options/state values.
                etIsEditing(false);
                setShowPostOptions(false);
                setShowPostOptionButton(true);
            }
        }
    }

    return (<textarea
        value={newItem === 'text' ? textValue : value}
        placeholder={placeholder}
        ref={ref}
        onChange={(e) => {
            handlePostEditChange(e)
        }}
        onKeyDown={(e) => { handleInputKeyPress(e) }}
    />)
});

export default TextEditField;