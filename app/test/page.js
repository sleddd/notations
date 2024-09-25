import AuthWrapper from '@/components/AuthWrapper';
import Link from 'next/link';

export default function Test() {
  return (
    <AuthWrapper>
      <main>
        <h1>Welcome to My Test App</h1>
        <Link href="/">Home</Link>
      </main>
    </AuthWrapper>
  );
}