'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';

interface Photo {
  Key: string;
  LastModified: string;
}

export function PhotoGrid() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/photos');
        const data = await response.json();
        setPhotos(data.photos || []);
      } catch (error) {
        console.error('Error fetching photos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-100 rounded-lg shadow-md aspect-square animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {photos.map((photo) => (
        <div
          key={photo.Key}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="aspect-square relative bg-gray-100">
            <Image
              src={`https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.amazonaws.com/${photo.Key}`}
              alt={`Climbing wall photo from ${photo.LastModified}`}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <p className="text-gray-600">
              {format(new Date(photo.LastModified), 'M/d/yyyy')}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
