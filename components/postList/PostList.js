'use client';
import { 
    createContext, 
    useContext 
} from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { PostListItem } from '@/components/postList/post-list-item/PostListItem';
import { PostListNewItem } from '@/components/postList/post-list-item/PostListNewItem';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Default post state of PostList.
export const PostListState = {
    posts: [],
    collections: [],
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
    // Check page path. 
    const pathName = usePathname();
    const parts = pathName.split('/');
    const isCollection = parts[1] === 'collection';
    const collection = parts[2];
    const { posts, refetch, date } = useContext( PostListContext );

    // Calculate the previous day linke in year/month/day format.
    const previousDay = new Date(date);
    previousDay.setDate(previousDay.getDate() - 1);
    const previousDayLink = `/calendar/${previousDay.getFullYear()}/${previousDay.getMonth() + 1}/${previousDay.getDate()}`;

    // Calculate the next day linke in year/month/day format.
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    const nextDayLink = `/calendar/${nextDay.getFullYear()}/${nextDay.getMonth() + 1}/${nextDay.getDate()}`;

    return (
        <div className="post-list">
            { ! isCollection ?
                <div className="post-list__nav">
                    <Link href={previousDayLink}><ArrowBackIosIcon /></Link>
                    <p className="post-list__date">{date.toDateString()}</p>
                    <Link href={nextDayLink}><ArrowForwardIosIcon /></Link>
                </div>
            : 
                <>
                    <h1 className="post-list__collections--title">{ collection } collection</h1>
                    <p><Link href="/collections">Back to collections</Link></p>
                </>
            }
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