import { format } from 'date-fns';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';

interface ImageModalProps {
  imageKey: string;
  lastModified: string;
  onClose: () => void;
  onShare: () => void;
  onDelete: () => void;
}

export function ImageModal({
  imageKey,
  lastModified,
  onClose,
  onShare,
  onDelete,
}: ImageModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] flex flex-col overflow-hidden relative">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 z-50 cursor-pointer text-white 
                     bg-black/40 rounded-full p-1 
                     ring-1 ring-black/60 
                     hover:bg-black/60"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Image */}
        <div className="w-full h-[60vh] bg-gray-100 p-6">
          <div className="relative w-full h-full">
            <Image
              src={`https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.amazonaws.com/${imageKey}`}
              alt={`Climbing wall photo from ${lastModified}`}
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 flex items-center justify-between shrink-0 flex-wrap gap-2">
          <p className="text-gray-600">
            Taken on {format(new Date(lastModified), "MMMM d, yyyy 'at' h:mm a")}
          </p>

          <div className="flex gap-2">
            <button
              onClick={onShare}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                />
              </svg>
              Share
            </button>

            <button
              onClick={onDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}