'use client';
import { usePathname } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { GET_POSTS_BY_DAY } from '@/graphql/queries';
import { PostList } from '@/components/postList/PostList';
import { useSession } from 'next-auth/react';

export const CalendarDay = () => {
  const pathName = usePathname();
  const parts = pathName.split('/');
  const year = parts[parts.length - 3];
  const month = parts[parts.length - 2];
  const day = parts[parts.length - 1];
  const { data: user } = useSession();

  const { data, loading, refetch } = useQuery(GET_POSTS_BY_DAY, {
    variables: { 
      year: parseInt(year), 
      month: parseInt(month), 
      day: parseInt(day),
      author: user?.user?.userId
    },
    fetchPolicy: "no-cache"
  });

  const date = new Date(
    parseInt(year), 
    parseInt(month) - 1, 
    parseInt(day)
  );

  return (
    <PostList
      postData={data?.posts?.edges}
      loading={loading}
      date={date}
      refetchPosts={refetch}
    />
  )
}

export default CalendarDay;