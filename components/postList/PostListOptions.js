'use client';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_POST } from '@/graphql/mutations';
export const PostListOptions = ({
    activePostId,
    setActivePostId,
    setIsEditing,
    setShowPostOptions,
    refetchPosts
}) => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [deletePost]                                = useMutation(DELETE_POST);

    const categories = [
        {
            name: 'Work',
            color: 'red'
        },
        {
            name: 'Research',
            color: 'blue'
        },
        {
            name: 'Health',
            color: 'green'
        },
        {
            name: 'Idea',
            color: 'purple'
        },
        {
            name: 'Family',
            color: 'yellow'
        },
        {
            name: 'Finance',
            color: 'orange'
        },
        {
            name: 'Other',
            color: 'gray'
        }
    ];

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

    const handleCategorySelect = () => {
        setIsEditing(false);
        setActivePostId(null);
        setShowPostOptions(false);
    }

    return (
        <ul className="post-list__item__options-menu">
            <li onClick={handleEdit}>Edit</li>
            <li onClick={handleCategorySelect}>Select Category
                <ul>
                    {categories.map(category => (
                        <li key={category.name} className={category.color}>{category.name}</li>
                    ))}
                </ul>
            </li>
            <li onClick={handleDelete}>Delete</li>
        </ul>
    );
}

export default PostListOptions;