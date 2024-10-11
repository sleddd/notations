'use client';
import { usePathname } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { GET_POSTS_BY_COLLECTION, GET_COLLECTIONS } from '@/graphql/queries';
import { PostList } from '@/components/postList/PostList';

export const Collection = () => {
    const pathName = usePathname();
    const parts = pathName.split('/');
    const slug = parts[parts.length - 1];

    // Query with GQL for posts by collection slug.
    const { data: postsData, loading: postsLoading, error: postsError, refetch } = useQuery(GET_POSTS_BY_COLLECTION, {
        variables: {
            slug: [slug],
        },
        fetchPolicy: "no-cache"
    });

    const { data: collectionsData, loading: collectionsLoading, error: collectionsError, refetch: collectionsRefetch } = useQuery(GET_COLLECTIONS);

    const posts = postsData?.collections?.nodes[0]?.posts?.edges;
    const collections = collectionsData?.collections?.edges?.map(({ node }) => node);
    const date = new Date();  

    // Set up post list content.
    const PostListState = {
        collections: collections,
        posts: posts,
        date,
        refetch: refetch,
        refetchCollections: collectionsRefetch
    }

    return (
        <PostList value={PostListState}/>
    )
}

export default Collection;