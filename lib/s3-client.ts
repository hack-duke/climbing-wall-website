import { S3Client } from '@aws-sdk/client-s3';
import { GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';

// Initialize S3 Client
const s3Client = new S3Client({
    region: 'us-east-2',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export const BUCKET_NAME = process.env.AWS_BUCKET_NAME || 'hackduke-climbing-wall';

export async function listPhotos() {
    try {
        const command = new ListObjectsV2Command({
            Bucket: BUCKET_NAME,
        });
        
        const response = await s3Client.send(command);
        return response.Contents || [];
    } catch (error) {
        console.error('Error listing photos:', error);
        throw error;
    }
}

export async function getPhoto(key: string) {
    try {
        const command = new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
        });
        
        const response = await s3Client.send(command);
        return response.Body;
    } catch (error) {
        console.error('Error getting photo:', error);
        throw error;
    }
}

export { s3Client };
