"use client";

import type React from "react";

import { useCallback, useEffect, useState } from "react";
import { X, Upload, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CLOUD_FRONT_URL } from "@/lib/constants";

interface ImageFile {
  file?: File;
  url?: string;
  preview: string;
  id: string;
  isExisting?: boolean;
}

interface MultiImageUploadProps {
  value?: (File | string)[];
  onChange?: (files: (File | string)[]) => void;
  maxFiles?: number;
  maxSize?: number; // in MB
  accept?: string;
  className?: string;
  disabled?: boolean;
}

export function MultiImageUpload({
  value = [],
  onChange,
  maxFiles = 10,
  maxSize = 5,
  accept = "image/*",
  className,
  disabled = false,
}: MultiImageUploadProps) {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [dragActive, setDragActive] = useState(false);

  // Convert File objects and URLs to ImageFile objects with previews
  useEffect(() => {
    const newImages = value.map((item, index) => {
      if (typeof item === "string") {
        // It's a URL
        return {
          url: CLOUD_FRONT_URL + item,
          preview: CLOUD_FRONT_URL + item,
          id: `url-${item}-${index}`,
          isExisting: true,
        };
      } else {
        // It's a File object
        return {
          file: item,
          preview: URL.createObjectURL(item),
          id: `${item.name}-${item.lastModified}`,
          isExisting: false,
        };
      }
    });

    // Cleanup old previews (only for File objects, not URLs)
    images.forEach((img) => {
      if (
        !img.isExisting &&
        !newImages.find((newImg) => newImg.id === img.id)
      ) {
        URL.revokeObjectURL(img.preview);
      }
    });

    setImages(newImages);

    // Cleanup on unmount
    return () => {
      newImages.forEach((img) => {
        if (!img.isExisting) {
          URL.revokeObjectURL(img.preview);
        }
      });
    };
  }, [value]);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || disabled) return;

      const validFiles: File[] = [];
      const currentCount = value.length;

      Array.from(files).forEach((file) => {
        // Check file type
        if (!file.type.startsWith("image/")) {
          return;
        }

        // Check file size
        if (file.size > maxSize * 1024 * 1024) {
          return;
        }

        // Check max files limit
        if (currentCount + validFiles.length >= maxFiles) {
          return;
        }

        // Check for duplicates (only against File objects)
        const isDuplicate = value.some((existingItem) => {
          if (typeof existingItem === "string") return false;
          return (
            existingItem.name === file.name &&
            existingItem.size === file.size &&
            existingItem.lastModified === file.lastModified
          );
        });

        if (!isDuplicate) {
          validFiles.push(file);
        }
      });

      if (validFiles.length > 0) {
        onChange?.([...value, ...validFiles]);
      }
    },
    [value, onChange, maxFiles, maxSize, disabled]
  );

  const removeImage = useCallback(
    (index: number) => {
      if (disabled) return;
      const newFiles = value.filter((_, i) => i !== index);
      onChange?.(newFiles);
    },
    [value, onChange, disabled]
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files);
      // Reset input value to allow selecting the same file again
      e.target.value = "";
    },
    [handleFiles]
  );

  const getImageDisplayInfo = (image: ImageFile) => {
    if (image.file) {
      return {
        name: image.file.name,
        size: `${(image.file.size / 1024 / 1024).toFixed(2)} MB`,
      };
    } else if (image.url) {
      const urlParts = image.url.split("/");
      const fileName = urlParts[urlParts.length - 1] || "Existing image";
      return {
        name:
          fileName.length > 20 ? `${fileName.substring(0, 20)}...` : fileName,
        size: "Existing",
      };
    }
    return { name: "Unknown", size: "Unknown" };
  };

  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* Upload Area */}
      <div
        className={cn(
          "relative border-2 border-dashed rounded-lg p-6 transition-colors",
          dragActive
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-muted-foreground/50",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Input
          type="file"
          multiple
          accept={accept}
          onChange={handleInputChange}
          disabled={disabled}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />
        <div className="flex flex-col items-center justify-center text-center">
          <Upload className="h-10 w-10 text-muted-foreground mb-4" />
          <p className="text-sm font-medium">
            Drop images here or click to upload
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            PNG, JPG, WebP up to {maxSize}MB each (max {maxFiles} files)
          </p>
          {value.length > 0 && (
            <p className="text-xs text-muted-foreground mt-1">
              {value.length} of {maxFiles} files selected
            </p>
          )}
        </div>
      </div>

      {/* Image Thumbnails */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {images.map((image, index) => {
            const displayInfo = getImageDisplayInfo(image);
            return (
              <Card key={image.id} className="relative group overflow-hidden">
                <div className="h-[200px] relative">
                  <img
                    src={image.preview || "/placeholder.svg"}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {image.isExisting && (
                    <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                      Existing
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeImage(index)}
                      disabled={disabled}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-2">
                  <p className="text-xs text-muted-foreground truncate">
                    {displayInfo.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {displayInfo.size}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {images.length === 0 && (
        <div className="text-center py-8">
          <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">
            No images uploaded yet
          </p>
        </div>
      )}
    </div>
  );
}
