'use client';

import Image from "next/image";
import { PhotoGrid } from '@/components/PhotoGrid';
import { useState } from 'react';

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 12L8 6M14 12L8 18M14 12H8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h1 className="text-xl font-semibold">Climbing Photos</h1>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Climbing Wall Photos</h2>
          <p className="text-gray-600">
            Capturing your climbing moments from above. Browse photos taken from the top of our climbing wall.
          </p>
        </div>

        <PhotoGrid key={refreshKey} />
      </main>
    </div>
  );
}
