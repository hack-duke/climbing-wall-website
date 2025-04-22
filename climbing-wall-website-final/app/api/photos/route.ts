import { NextResponse } from 'next/server';
import { listPhotos, getPhoto } from '@/lib/s3-client';

export async function GET() {
    try {
        const photos = await listPhotos();
        return NextResponse.json({ photos });
    } catch (error) {
        console.error('Error fetching photos:', error);
        return NextResponse.json(
            { error: 'Failed to fetch photos' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const { key } = await request.json();
        if (!key) {
            return NextResponse.json(
                { error: 'Photo key is required' },
                { status: 400 }
            );
        }

        const photo = await getPhoto(key);
        return NextResponse.json({ photo });
    } catch (error) {
        console.error('Error fetching specific photo:', error);
        return NextResponse.json(
            { error: 'Failed to fetch photo' },
            { status: 500 }
        );
    }
}
