'use client';
import { usePathname } from 'next/navigation';
import { useContext, useState } from 'react';
import { PostListContext } from '@/components/postList/PostList';
import { useMutation } from '@apollo/client';
import { UPDATE_POST, CREATE_POST } from '@/graphql/mutations';
import { formatDateToWP } from '@/lib/calendar';

export const TextField = ({
    postid,
    value,
    setIsEditing
 }) => {    
    const pathName = usePathname();
    const parts = pathName.split('/');
    const isCollection = parts[1] === 'collection'  || parts[1] === 'collections';
    const collection = parts[2];
    const { refetch, date, refetchCollections } = useContext(PostListContext);
    const [updatePost] = useMutation(UPDATE_POST);
    const [createPost] = useMutation(CREATE_POST);
    const [inputValue, setInputValue] = useState(value);

    const handleTextFieldEvent = async(e) => {
        setInputValue(e.target.value);

        // Editing end.
        if ( ( e.key === 'Enter' && !e.shiftKey ) || e.key === 'Escape' || e.type === 'touchend' ) {
            // Save post. 
            if ( postid != 0 ) {
                // Update existing post.
                await updatePost({
                    variables: {
                        input: {
                            id: postid,
                            content: e.target.value?.replace(/<[^>]*>/g, ''),
                        }
                    }
                });
                await refetch();
                setInputValue('');
                setIsEditing(false);
            } else {
                let inputVariables =  {
                    date: formatDateToWP(date),
                    title: formatDateToWP(date),
                    content: e.target.value?.replace(/<[^>]*>/g, ''),
                    status: "PRIVATE",
                    postFormats: {
                        append: false,
                        nodes: [
                            { name: 'standard' }
                        ]
                    }
                };
                if ( isCollection ) {
                    inputVariables.collections = {
                        append: true,
                        nodes: [
                            { slug: collection }
                        ]
                    }
                };
                // Create new post.
                await createPost({
                    variables: {
                        input: inputVariables
                    }
                });
            }
            await refetch();
            if ( isCollection ) {
                await refetchCollections();
            }
            setInputValue('');
            setIsEditing(false);
        }

        // Editing start.        
        if ( e.type === 'click' || e.type === 'touchstart') {
            // Still editing.
            setIsEditing(true);
        }
    }

    return (
        <textarea 
            placeholder="Click to type and enter to save..." 
            onClick={(e)=>handleTextFieldEvent(e)}
            onChange={(e)=>handleTextFieldEvent(e)}
            onKeyDown={(e)=>handleTextFieldEvent(e)}   
            onTouchStart={(e)=>handleTextFieldEvent(e)}
            onTouchEnd={(e)=>handleTextFieldEvent(e)}
            value={inputValue}
        />
    );
}

export default TextField;