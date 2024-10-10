'use client';
import { useState } from 'react';
import { TextField } from '@/components/postList/post-list-item/edit-fields/TextField';
import { ImageField } from '@/components/postList/post-list-item/edit-fields/ImageField';
import { NewItemSwitcher } from '@/components/postList/post-list-item/edit-fields/NewItemSwitcher';

export const PostListNewItem = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [postFormat, setPostFormat] = useState('standard');

    const handleNewtItemEvent = (e) => {
        // Editing end.
        if (e.key === 'Enter' || e.key === 'Escape' || e.type === 'touchend') {
            setIsEditing(false);
        }
        // Editing start.        
        if (e.type === 'click' || e.type === 'touchstart') {
            setIsEditing(true);
        }
    }

    return (
        <li
            className="post-list__item post-list__item--new"
            onClick={handleNewtItemEvent}
            onKeyDown={handleNewtItemEvent}
            onKeyUp={handleNewtItemEvent}
            onTouchStart={handleNewtItemEvent}
            onTouchEnd={handleNewtItemEvent}
        >
            {postFormat === 'standard' &&
                <TextField
                    postid={0}
                    value={''}
                    setIsEditing={setIsEditing}
                />
            }
            {postFormat === 'image' &&
                <ImageField />
            }
            {postFormat === 'link' &&
                <p>Link</p>
            }
            <NewItemSwitcher postFormatCallback={setPostFormat} />
        </li>
    );
}

export default PostListNewItem;