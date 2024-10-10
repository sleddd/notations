'use client';
import { 
    createContext, 
    useContext 
} from 'react';
import { PostListItem } from '@/components/postList/post-list-item/PostListItem';
import { PostListNewItem } from '@/components/postList/post-list-item/PostListNewItem';

// Default post state of PostList.
export const PostListState = {
    posts: [],
    date: new Date(),
    refetch: () => { },
}

// Setting up PostList context with default PostList state.
export const PostListContext = createContext(PostListState);


// Adding a wrapper, so you can call PostList as one component and pass it PostList state.
export const PostList = ({ value }) => {
    const postList = { ...value };
    return (
        <PostListContext.Provider value={value}>
            <PostListContent />
        </PostListContext.Provider>
    );
}

// PostListContent is the actual component that will render the PostList.
export const PostListContent = () => {
    const { posts, refetch, date } = useContext( PostListContext );

    return (
        <div className="post-list">
            <p className="post-list__date">{date.toDateString()}</p>
            <ul className="post-list__items">
                <PostListNewItem />
                {posts?.map(({ node }) => (
                    <PostListItem
                        key={node.postId}
                        post={node}
                    />
                ))}
            </ul>
        </div>
    );
}

// Export PostList as default.
export default PostList;