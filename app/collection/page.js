'use client';
import { useQuery } from '@apollo/client';
import { GET_COLLECTIONS } from '@/graphql/queries';
import { PostList } from '@/components/postList/PostList';
import Link from 'next/link';

export const Collection = () => {
    const { data, loading, error, refetch } = useQuery(GET_COLLECTIONS);
    const collections = data?.collections?.edges?.map(({ node }) => node);

    return (
        <div className="post-list">
            <div className="post-list__collections">
                <h1>List of All Collections</h1>
                {collections?.map(({ collectionId, name, slug }) => (
                    <Link key={collectionId} href={`/collection/${slug}`}>
                        {name}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Collection;