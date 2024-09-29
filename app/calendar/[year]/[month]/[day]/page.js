'use client';
import AuthWrapper from '@/components/auth/AuthWrapper';
import { usePathname } from 'next/navigation';
import { client } from '@/lib/apollo-client';
import { gql, useQuery } from '@apollo/client';
import { notFound } from 'next/router';
import { PostList } from '@/components/postList/PostList';

const GET_POST_BY_DAY = gql`query getPostsByDay($year: Int = 2024, $month: Int = 9, $day: Int = 27) {
  posts(
    where: {status: PRIVATE, dateQuery: {year: $year, month: $month, day: $day}}
  ) {
    edges {
      node {
        id
        postId
        title
      }
    }
  }
}`;

export default function CalendarDay({ params }) {
    const pathName = usePathname();
    const parts = pathName.split('/');
    const year = parts[parts.length - 3];
    const month = parts[parts.length - 2];
    const day = parts[parts.length - 1];

    const { data, loading, error, refetch } = useQuery(GET_POST_BY_DAY, {
        variables: { year: parseInt(year), month: parseInt(month), day: parseInt(day) },
        fetchPolicy: "no-cache"
    }, { client });

    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    if (isNaN(date.getTime())) {
        notFound();
    }

    return (
        <AuthWrapper>
            <PostList 
                postData={data?.posts?.edges} 
                loading={loading} 
                date={date}
                refetchPosts={refetch}
             />
        </AuthWrapper>
    )
}