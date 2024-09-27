'use client';
import AuthWrapper from '@/components/auth/AuthWrapper';
import { usePathname } from 'next/navigation';
import { client } from '@/lib/apollo-client';
import { gql, useQuery } from '@apollo/client';
import { notFound } from 'next/router';

const GET_POST_BY_DAY = gql`query getPostsByDay($year: Int = 2024, $month: Int = 9, $day: Int = 27) {
  posts(
    where: {status: PRIVATE, dateQuery: {year: $year, month: $month, day: $day}}
  ) {
    edges {
      node {
        id
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
    const { data, loading, error } = useQuery(GET_POST_BY_DAY, {
        variables: { year: parseInt(year), month: parseInt(month), day: parseInt(day) }
    }, { client });

    // Validate the date
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    if (isNaN(date.getTime())) {
        notFound()
    }

    return (
        <AuthWrapper>
            <div className="post-list">
                {loading && !data?.posts?.length ? (
                    <p>{date.toDateString()} Loading...</p>
                ) : (
                    <>
                        <p>{date.toDateString()}</p>
                        <ul>
                            {data?.posts?.edges.map(({ node }) => (
                                <li key={node.id}>{node.title}</li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </AuthWrapper>
    )
}