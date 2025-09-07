'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to builder page
    router.push('/builder');
  }, [router]);

  return (
    <div className="h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🚀</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">ContextDrop Builder</h1>
        <p className="text-gray-600 mb-4">Redirecting to the website builder...</p>
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-indigo-200 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-indigo-200 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
