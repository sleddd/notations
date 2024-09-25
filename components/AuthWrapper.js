'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { useState } from 'react';

export const AuthWrapper = ({ children }) => {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check authentication status client-side
        const checkAuth = async () => {
            // Your client-side auth check logic here
            if (!user) {
                router.push('/');
            }
            setIsLoading(false);
        };

        checkAuth();
    }, [router]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
}

export default AuthWrapper;