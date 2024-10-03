import { useState, useRef, useEffect } from 'react';
import { PostListOptions } from './PostListOptions';
import { useMutation } from '@apollo/client';
import { UPDATE_POST } from '@/graphql/mutations';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { signifiers } from './signifiers';

export const PostListItem = ({
    post,
    postInputValues,
    setPostInputValues,
    refetchPosts
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [activePostId, setActivePostId] = useState(null);
    const [activePostContent, setActivePostContent] = useState(null);
    const [showPostOptions, setShowPostOptions] = useState(false);
    const [showPostOptionButton, setShowPostOptionButton] = useState(true);
    const [showSignifierOptions, setShowSignifierOptions] = useState(false);
    const inputRef = useRef(null);
    const [updatePost] = useMutation(UPDATE_POST);
    let postFormat = post.postFormats.edges.map(({ node }) => node.name);
    postFormat = postFormat.filter((item, index) => postFormat.indexOf(item) === index);
    if (postFormat.length < 1) {
        postFormat = 'Standard';
    }
    const signifierClass = showSignifierOptions ? 'text-white' : '';

    // Convert category to signifier icon.
    let category = post.categories.edges.map(({ node }) => node.slug);
    category = category?.[0] || 'task';
    if ('uncategorized' == category) {
        category = 'task';
    }
    let signifier = signifiers.find(signifier => signifier.slug === category);
    signifier = signifier ? signifier.icon : <PlaylistAddCheckIcon />;

    useEffect(() => {
        if (isEditing) {
            setTimeout(() => {
                if (inputRef.current) {
                    inputRef.current.focus();
                }
            }, 0);
        }
    }, [isEditing]);


    const handlePostEditChange = (e, postId) => {
        const updatedPostInputValues = postInputValues.map(post => {
            if (post.id === postId) {
                return { ...post, value: e.target.value };
            }
            return post;
        });
        setPostInputValues(updatedPostInputValues);
    }

    const handleInputKeyPress = (e, postId) => {
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

    const handleOptionsButtonClick = (postId) => {
        setActivePostId(postId);
        setIsEditing(false);
        showPostOptions ? setShowPostOptions(false) : setShowPostOptions(true);
    }

    const handlePostClick = (e, postId) => {
        setActivePostId(postId);
        setIsEditing('editing');
        setShowPostOptions(false);
        setShowPostOptionButton(false);
    }

    const handleCategorySelect = async (postId, catSlug) => {
        await updatePost({
            variables: {
                input: {
                    id: postId,
                    categories: {
                        append: false,
                        nodes: [
                            { name: catSlug }
                        ]
                    }
                }
            }
        });
        await refetchPosts();
        setIsEditing(false);
        setActivePostId(null);
        setShowPostOptions(false);
    }

    return (<li className="post-list__item" key={post.id}>
        <ul className={`post-list__item__signifiers ${postFormat}`}>
            <li
                className={`post-list__item__signifiers--active ${signifierClass}`}
                onClick={() => { 
                    showSignifierOptions ? setShowSignifierOptions(false) : setShowSignifierOptions(true); 
                }}>
                {signifier}
                {showSignifierOptions &&
                    <ul>
                        {signifiers.map(signifier => {
                            return (
                                <li
                                    key={signifier.slug}
                                    role="button"
                                    data-category={signifier.slug}
                                    data-postid={post.postId}
                                    onClick={() => handleCategorySelect(post.postId, signifier.slug)} >
                                    {signifier.icon}
                                </li>
                            );
                        })}
                    </ul>
                }
            </li>
        </ul>
        <span onClick={(e) => { handlePostClick(e, post.postId) }}>
            {!isEditing ? postInputValues.find(postInput => postInput.id === post.postId).value : ''}
        </span>
        {showPostOptionButton ?
            <button className="post-list__item__options-button" onClick={() => { handleOptionsButtonClick(post.postId) }}>...</button> : ''}
        {showPostOptions ?
            <PostListOptions
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                activePostId={activePostId}
                setActivePostId={setActivePostId}
                activePostContent={activePostContent}
                showPostOptions={showPostOptions}
                setShowPostOptions={setShowPostOptions}
                refetchPosts={refetchPosts}
            />
            : ''}
        {activePostId == post.postId && 'editing' == isEditing && 'Standard' == postFormat ?
            <textarea
                value={postInputValues.find(postInput => postInput.id === post.postId).value !== 'Click to write here...' ? postInputValues.find(postInput => postInput.id === post.postId).value : ''}
                placeholder="Hit enter to save..."
                ref={inputRef}
                onChange={(e) => {
                    handlePostEditChange(e, post.postId)
                }}
                onKeyDown={(e) => { handleInputKeyPress(e, post.postId) }}
            />
            : ''}
    </li>)
}
