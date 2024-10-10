'use client';
import { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_POST } from '@/graphql/mutations';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { PostListContext } from '@/components/postList/PostList';

export const ItemEditActions = ({
    postid,
    setIsEditing
}) => {
    const { refetch } = useContext(PostListContext);
    const [toggleEditActions, setToggleEditActions] = useState(false);
    const [deletePost] = useMutation(DELETE_POST);

    const handleEdit = () => {
        setIsEditing('editing');
        setToggleEditActions(false);
    }

    const handleDelete = async () => {
        await deletePost({
            variables: {
                input: {
                    id: postid
                }
            }
        });
        await refetch();
        setToggleEditActions(false);
    }

    const blankEventHandler = () => {
        // Blank event handler  
    }

    return (
        <>
            <button 
                className="post-list__item__actions-button"
                onClick={() => setToggleEditActions(!toggleEditActions)}
            >...</button>
            {toggleEditActions &&
                <ul className="post-list__item__actions">
                    <li className="bookmark"><BookmarkBorderIcon /> Add to Collection</li>
                    <li onClick={handleEdit}>Edit</li>
                    <li onClick={handleDelete}>Delete</li>
                    <li className="migrating">Make Migrate</li>
                    <li onClick={blankEventHandler}>Make Public</li>
                    <li onClick={blankEventHandler}>Share Public Link</li>
                </ul>
            }
        </>
    );
}

export default ItemEditActions;
