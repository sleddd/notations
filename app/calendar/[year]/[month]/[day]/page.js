'use client';
import { usePathname } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { GET_POSTS_BY_DAY } from '@/graphql/queries';
import { PostList } from '@/components/postList/PostList';
import { useSession } from 'next-auth/react';

export const CalendarDay = () => {
  // Get calendar requested from path name.
  const pathName = usePathname();
  const parts = pathName.split('/');
  const year = parts[parts.length - 3];
  const month = parts[parts.length - 2];
  const day = parts[parts.length - 1];
  const { data: user } = useSession();

  // Query with GQL for day. 
  const { data, loading, refetch } = useQuery(GET_POSTS_BY_DAY, {
    variables: { 
      year: parseInt(year), 
      month: parseInt(month), 
      day: parseInt(day),
      author: user?.user?.userId
    },
    fetchPolicy: "no-cache"
  });

  // Format date requested for outputting to screen.
  const date = new Date(
    parseInt(year), 
    parseInt(month) - 1, 
    parseInt(day)
  );

  // Set up post list content.
  const PostListState = {
    posts: data?.posts?.edges,
    date,
    refetch: refetch,
  }

  return (
    <PostList value={PostListState}/>
  )
}

export default CalendarDay;