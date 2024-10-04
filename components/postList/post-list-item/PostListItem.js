import { useState, useRef, useEffect } from 'react';
import { PostEditActions } from './edit-fields/postEditActions';
import { TextEditField } from './edit-fields/textEditField';
import { ImageEditField } from './edit-fields/imageEditField';
import { SignifiersSelect } from './edit-fields/signifiersSelect';
import { signifiers } from './signifiers';

export const PostListItem = ({
    post,
    postInputValues,
    setPostInputValues,
    addingImage,
    setAddingImage,
    refetchPosts,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [activePostId, setActivePostId] = useState(null);
    const [activePostContent, setActivePostContent] = useState(null);
    const [showPostOptions, setShowPostOptions] = useState(false);
    const [showPostOptionButton, setShowPostOptionButton] = useState(true);
    const [showSignifierOptions, setShowSignifierOptions] = useState(false);
    const inputRef = useRef(null);
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
    signifier = signifier ? signifier.icon : signifiers['task'].icon;

    let imagePostUrl = null;
    if ( 'Image' == postFormat ) {
        imagePostUrl = post?.featuredImage?.node?.link;
    }

    useEffect(() => {
        if (isEditing) {
            setTimeout(() => {
                if (inputRef.current) {
                    inputRef.current.focus();
                }
            }, 0);
        }
    }, [isEditing]);


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

    return (<li className="post-list__item" key={post.id}>
        <ul className={`post-list__item__signifiers`}>
            <li
                className={`post-list__item__signifiers--active ${signifierClass}`}
                onClick={() => {
                    showSignifierOptions ? setShowSignifierOptions(false) : setShowSignifierOptions(true);
                }}>{signifier}
                {showSignifierOptions &&
                    // If use clicks to change signifier, then show signifier select options.
                    <SignifiersSelect
                        postId={post.postId}
                        icon={signifier.icon}
                        slug={signifier.slug}
                        refetchPosts={refetchPosts}
                        setIsEditing={setIsEditing}
                        setActivePostId={setActivePostId}
                        setShowPostOptions={setShowPostOptions}
                        date={date}
                    />}
            </li>
        </ul>
        <span onClick={(e) => { handlePostClick(e, post.postId) }}>
            { 'Image' == postFormat && imagePostUrl ? <img src={imagePostUrl} /> : ''}
            {!isEditing && 'Standard' == postFormat && postInputValues.find(postInput => postInput.id === post.postId).value}
        </span>
        {showPostOptionButton ?
            <button className="post-list__item__options-button" onClick={() => { handleOptionsButtonClick(post.postId) }}>...</button> : ''}
        {showPostOptions &&
            // Show post options if postId "..." menu button was clicked.
            <PostEditActions
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                activePostId={activePostId}
                setActivePostId={setActivePostId}
                activePostContent={activePostContent}
                showPostOptions={showPostOptions}
                setShowPostOptions={setShowPostOptions}
                refetchPosts={refetchPosts}
            />}
        {activePostId == post.postId && 'editing' == isEditing && 'Standard' == postFormat &&
            // Show text edit field if postId was clicked, is in editing mode, and post item standard or text format.
            <TextEditField
                value={postInputValues.find(postInput => postInput.id === post.postId).value !== 'Click to write here...' ? postInputValues.find(postInput => postInput.id === post.postId).value : ''}
                placeholder="Hit enter to save..."
                ref={inputRef}
                postId={post.postId}
                postInputValues={postInputValues}
                setPostInputValues={setPostInputValues}
                refetchPosts={refetchPosts}
                setIsEditing={setIsEditing}
                setActivePostContent={setActivePostContent}
                setShowPostOptions={setShowPostOptions}
                setShowPostOptionButton={setShowPostOptionButton}
                setActivePostId={setActivePostId}
         />}
         { addingImage && addingImage == post.postId && 'Image' == postFormat &&
            <ImageEditField 
                refetchPosts={refetchPosts}
                addingImage={addingImage}
                setAddingImage={setAddingImage}
            /> }
    </li>)
}
