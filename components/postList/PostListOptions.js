'use client';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_POST } from '@/graphql/mutations';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

export const PostListOptions = ({
    activePostId,
    setActivePostId,
    setIsEditing,
    setShowPostOptions,
    refetchPosts
}) => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [deletePost]                                = useMutation(DELETE_POST);

    const handleEdit = () => {
        setIsEditing('editing');
        setShowPostOptions(false);
    }

    const handleDelete = async () => {
        deletePost({
            variables: {
                input: {
                    id: activePostId
                }
            }
        });
        refetchPosts();
        setIsEditing(false);
        setActivePostId(null);
        setShowPostOptions(false);
    }

    return (
        <ul className="post-list__item__options-menu">
            <li className="bookmark"><BookmarkBorderIcon /> Add to Collection</li>
            <li onClick={handleEdit}>Edit</li>
            <li onClick={handleDelete}>Delete</li>
        </ul>
    );
}

export default PostListOptions;
