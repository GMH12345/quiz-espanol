import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push('/step-1');
  }, [router]);
  return null;
}
