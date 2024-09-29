'use client';
import { useState, useEffect } from 'react';
export const PostListOptions = ({
    activePostId,
    setActivePostId,
    activePostContent,
    setActivePostContent,
    isEditing,
    setIsEditing,
    showPostOptions,
    setShowPostOptions,
    refetchPosts,
}) => {


    console.log( isEditing );
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        if ( 'saved' == isEditing) {
            console.log(activePostId);
            console.log( activePostContent );
            refetchPosts();
            setIsEditing(false);
            setActivePostId(null);
            setActivePostContent(null); 
            setShowPostOptions(false);
        }
        if ('deleting' == isEditing) {
            console.log(activePostId);
            refetchPosts();
            setIsEditing(false);
            setActivePostId(null);
            setShowPostOptions(false);
        }
        if ('categorizing' == isEditing) {
            console.log(activePostId);
            setIsEditing(false);
            setActivePostId(null);
            setShowPostOptions(false);
        }
    }, [isEditing, activePostId, activePostContent, showPostOptions]);

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

    const handleDelete = () => {
        setIsEditing('deleting');
    }

    const handleCategorySelect = () => {
        setIsEditing('categorizing');
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