'use client';
import { useState } from 'react';
import { TextField } from '@/components/postList/post-list-item/edit-fields/TextField';
import { ItemEditActions } from '@/components/postList/post-list-item/edit-fields/ItemEditActions';
import { SignifierSwitcher } from '@/components/postList/post-list-item/edit-fields/SignifierSwitcher';
import { Reactions } from '@/components/postList/post-list-item/edit-fields/Reactions';
import BookmarkIcon from '@mui/icons-material/Bookmark';

export const PostItemState = {
    post: {},
    isEditing: false,
}

export const PostListItem = ({ post }) => {
    const [isEditing, setIsEditing] = useState(false);

    // Get post format.
    let postFormat = post.postFormats.edges.map(({ node }) => node.name).toString().toLowerCase();
    if (postFormat.length < 1) {
        postFormat = 'standard';
    }

    // Set collections.
    const postCollections = post?.collections?.edges?.map(({ node }) => node);

    // Set post list classes
    const postListClasses = 'image' == postFormat ? 'post-list__item post-list__item--image' : 'post-list__item post-list__item--standard';

    const handlePostListItemEvent = (e) => {
        e.preventDefault();
        if (!e.target.classList.contains('post-list__item---text') && e.target.tagName != 'TEXTAREA' && e.target.tagName != 'DIV') {
            return;
        }

        // Editing end.
        if (e.key === 'Enter' || e.key == 'Escape' || e.type === 'touchend') {
            setIsEditing(false);
        }
        // Editing start.        
        if (e.type === 'click' || e.type === 'touchstart') {
            setIsEditing(true);
        }
    }
    return (
        <li
            key={post.id}
            className={postListClasses}
        >
            { postCollections?.length ? <span className="post-list__item--bookmarked"><BookmarkIcon/></span> : '' }
            {isEditing &&
                <>
                    {'standard' == postFormat &&
                        <TextField
                            postid={post?.postId}
                            value={post?.content?.replace(/<[^>]*>?/gm, '')}
                            setIsEditing={setIsEditing}
                        />}

                    {'link' == postFormat &&
                        <TextField
                            postid={post?.postId}
                            value={post?.content?.replace(/<[^>]*>?/gm, '')}
                            setIsEditing={setIsEditing}
                        />}

                    {'image' == postFormat &&
                        <img src={post?.featuredImage?.node?.link} loading="lazy" />
                    }
                </>
            }
            {!isEditing &&
                <>
                    {'standard' == postFormat || 'link' == postFormat ?
                        <div 
                            className="post-list__item--text"
                            onClick={handlePostListItemEvent}
                            onKeyDown={handlePostListItemEvent}
                            onTouchStart={handlePostListItemEvent}
                            onTouchEnd={handlePostListItemEvent}
                        >{post?.content?.replace(/<[^>]*>?/gm, '')}
                        </div> :
                        <img src={post?.featuredImage?.node?.link} loading="lazy" />
                    }
                </>
            }
            <ItemEditActions
                setIsEditing={setIsEditing}
                postCollections={postCollections}
                postid={post?.postId}
            />
            <SignifierSwitcher
                postid={post?.postId}
                postSignifiers={post.categories.edges}
            />
            { 'image' == postFormat && <Reactions post={post} />  }
        </li>
    );
}

export default PostListItem;