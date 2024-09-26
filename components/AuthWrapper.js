'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';

export const AuthWrapper = ({ children }) => {
    const { user, loading } = useAuth();
    const router = useRouter();
    useEffect(() => {
        if (!user && !loading) {
            router.push('/');
        }
    }, [loading]);

    if (loading) {
        return <div>Loading...</div>;
    }
    return <>{!!user && !loading ? <>{children}</> : ''}</>;
}
export default AuthWrapper;