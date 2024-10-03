
import { UPDATE_POST } from '@/graphql/mutations';
import { useMutation } from '@apollo/client';
import { forwardRef } from 'react';

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
    setActivePostId
}, ref) => {
    const [updatePost] = useMutation(UPDATE_POST);

    const handlePostEditChange = (e) => {
        const updatedPostInputValues = postInputValues.map(post => {
            if (post.id === postId) {
                return { ...post, value: e.target.value };
            }
            return post;
        });
        setPostInputValues(updatedPostInputValues);
    }

    const handleInputKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            const postValue = postInputValues.find(post => post.id === postId).value;
            updatePost({
                variables: {
                    input: {
                        id: postId,
                        content: postValue.replace(/<[^>]*>/g, '')
                    }
                }
            });
            refetchPosts();
            setIsEditing(false);
            setActivePostContent('');
            setActivePostId(null);
            setShowPostOptions(false);
            setShowPostOptionButton(true);
        }
        if (e.key === 'Escape') {
            setIsEditing(false);
            setShowPostOptions(false);
            setShowPostOptionButton(true);
        }
    }

    return (<textarea
        value={value}
        placeholder={placeholder}
        ref={ref}
        onChange={(e) => {
            handlePostEditChange(e)
        }}
        onKeyDown={(e) => { handleInputKeyPress(e) }}
    />)
});

export default TextEditField;