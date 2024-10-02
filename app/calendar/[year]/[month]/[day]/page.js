'use client';
import { usePathname } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { GET_POST_BY_DAY } from '@/graphql/queries';
import { notFound } from 'next/router';
import { PostList } from '@/components/postList/PostList';
import { useRouter } from "next/navigation";

export const CalendarDay = ({ params }) => {
  const pathName = usePathname();
  const parts = pathName.split('/');
  const year = parts[parts.length - 3];
  const month = parts[parts.length - 2];
  const day = parts[parts.length - 1];
  const router = useRouter();

  const { data, loading, error, refetch } = useQuery(GET_POST_BY_DAY, {
    variables: { 
      year: parseInt(year), 
      month: parseInt(month), 
      day: parseInt(day) 
    },
    fetchPolicy: "no-cache"
  });

  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
  if (isNaN(date.getTime())) {
    notFound();
  }

  return (
    <PostList
      postData={data?.posts?.edges}
      loading={loading}
      date={date}
      refetchPosts={refetch}
      pageDate={{
        year,
        month,
        day
      }}
    />
  )
}

export default CalendarDay;