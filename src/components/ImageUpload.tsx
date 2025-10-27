'use client';

import React, { useState, useCallback, useRef } from 'react';
import { Upload, X, Image as ImageIcon, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { API_BASE_URL } from '@/lib/config';

interface ImageData {
  id: number;
  filename: string;
  url: string;
  thumbnail_url: string;
  width: number;
  height: number;
  size: number;
  mime_type: string;
}

interface ImageUploadProps {
  entityType: 'products' | 'categories' | 'banners';
  entityId?: number;
  onUploadSuccess?: (imageData: ImageData) => void;
  onUploadError?: (error: string) => void;
  maxFiles?: number;
  acceptedTypes?: string[];
  maxSizeMB?: number;
}

interface UploadState {
  file: File;
  progress: number;
  status: 'idle' | 'uploading' | 'success' | 'error';
  error?: string;
  result?: ImageData;
}

export default function ImageUpload({
  entityType,
  entityId,
  onUploadSuccess,
  onUploadError,
  maxFiles = 5,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  maxSizeMB = 10
}: ImageUploadProps) {
  const [uploads, setUploads] = useState<UploadState[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback((file: File): string | null => {
    if (!acceptedTypes.includes(file.type)) {
      return `Invalid file type. Accepted: ${acceptedTypes.join(', ')}`;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      return `File too large. Maximum size: ${maxSizeMB}MB`;
    }
    return null;
  }, [acceptedTypes, maxSizeMB]);

  const uploadFile = useCallback(async (file: File, index: number) => {
    const validationError = validateFile(file);
    if (validationError) {
      setUploads(prev => prev.map((upload, i) =>
        i === index ? { ...upload, status: 'error', error: validationError } : upload
      ));
      onUploadError?.(validationError);
      return;
    }

    setUploads(prev => prev.map((upload, i) =>
      i === index ? { ...upload, status: 'uploading', progress: 0 } : upload
    ));

    try {
      const formData = new FormData();
      formData.append('file', file);

      const url = entityId
        ? `${API_BASE_URL}/api/images/upload/${entityType}?entity_id=${encodeURIComponent(String(entityId))}`
        : `${API_BASE_URL}/api/images/upload/${entityType}`;

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Upload failed');
      }

      const result = await response.json();

      setUploads(prev => prev.map((upload, i) =>
        i === index ? { ...upload, status: 'success', progress: 100, result } : upload
      ));

      onUploadSuccess?.(result);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      setUploads(prev => prev.map((upload, i) =>
        i === index ? { ...upload, status: 'error', error: errorMessage } : upload
      ));
      onUploadError?.(errorMessage);
    }
  }, [onUploadError, onUploadSuccess, entityId, entityType, API_BASE_URL]);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => !validateFile(file));

    if (uploads.length + validFiles.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }

    const newUploads: UploadState[] = validFiles.map(file => ({
      file,
      progress: 0,
      status: 'idle'
    }));

    setUploads(prev => [...prev, ...newUploads]);

    // Start uploading files
    newUploads.forEach((upload, index) => {
      const globalIndex = uploads.length + index;
      uploadFile(upload.file, globalIndex);
    });
  }, [uploads.length, maxFiles, validateFile, uploadFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  }, [handleFiles]);

  const removeUpload = (index: number) => {
    setUploads(prev => prev.filter((_, i) => i !== index));
  };

  const clearCompleted = () => {
    setUploads(prev => prev.filter(upload => upload.status === 'uploading'));
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <Card>
        <CardContent className="p-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <div className="space-y-2">
              <p className="text-lg font-medium">
                Drop images here or{' '}
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-500 font-medium"
                  onClick={() => fileInputRef.current?.click()}
                >
                  browse
                </button>
              </p>
              <p className="text-sm text-gray-500">
                Supports: {acceptedTypes.join(', ')} • Max size: {maxSizeMB}MB
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept={acceptedTypes.join(',')}
              onChange={handleFileInput}
              className="hidden"
            />
          </div>
        </CardContent>
      </Card>

      {/* Upload Progress */}
      {uploads.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Uploads ({uploads.length})</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={clearCompleted}
                disabled={!uploads.some(u => u.status === 'success' || u.status === 'error')}
              >
                Clear Completed
              </Button>
            </div>

            <div className="space-y-3">
              {uploads.map((upload, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <div className="flex-shrink-0">
                    {upload.status === 'success' ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : upload.status === 'error' ? (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    ) : upload.status === 'uploading' ? (
                      <div className="h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <ImageIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{upload.file.name}</p>
                    <p className="text-xs text-gray-500">
                      {(upload.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>

                    {upload.status === 'uploading' && (
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${upload.progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{upload.progress}%</p>
                      </div>
                    )}

                    {upload.status === 'error' && upload.error && (
                      <Alert className="mt-2">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription className="text-xs">{upload.error}</AlertDescription>
                      </Alert>
                    )}

                    {upload.status === 'success' && upload.result && (
                      <div className="mt-2 text-xs text-green-600">
                        Uploaded successfully • {upload.result.width}x{upload.result.height}
                      </div>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeUpload(index)}
                    className="flex-shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Images will be automatically optimized and resized for web delivery.
          Thumbnails are generated automatically for better performance.
        </AlertDescription>
      </Alert>
    </div>
  );
}
