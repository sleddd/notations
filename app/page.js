'use client';
import { useAuth } from '@/components/auth/AuthProvider';

export default function Home() {
  const { user } = useAuth();
  return (
    <></>
  );
}
