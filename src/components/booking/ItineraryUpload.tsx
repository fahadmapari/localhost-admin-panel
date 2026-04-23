import { useRef, useState } from "react";
import api from "@/lib/axios";
import { toast } from "sonner";
import { Download, FileText, Loader, Trash2, Upload } from "lucide-react";
import { Button } from "../ui/button";
import { ItineraryFile } from "@/types/booking";
import { CLOUD_FRONT_URL } from "@/lib/constants";
import dayjs from "dayjs";

const ALLOWED_EXT = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png", ".webp"];
const ACCEPT_ATTR = ALLOWED_EXT.join(",");

const formatSize = (bytes: number) => {
  if (!bytes) return "";
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(2)} MB`;
};

interface Props {
  label: string;
  file?: ItineraryFile | null;
  uploadUrl: string;
  deleteUrl: string;
  onUpdated: () => void;
}

const ItineraryUpload = ({
  label,
  file,
  uploadUrl,
  deleteUrl,
  onUpdated,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const picked = e.target.files?.[0];
    if (!picked) return;

    const formData = new FormData();
    formData.append("file", picked);

    setUploading(true);
    try {
      await api.post(uploadUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(`${label} uploaded`, {
        richColors: true,
        position: "top-center",
      });
      onUpdated();
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Upload failed";
      toast.error(message, { richColors: true, position: "top-center" });
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleDelete = async () => {
    if (!file) return;
    if (!window.confirm(`Remove ${label}?`)) return;

    setDeleting(true);
    try {
      await api.delete(deleteUrl);
      toast.success(`${label} removed`, {
        richColors: true,
        position: "top-center",
      });
      onUpdated();
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Delete failed";
      toast.error(message, { richColors: true, position: "top-center" });
    } finally {
      setDeleting(false);
    }
  };

  const downloadHref = file ? `${CLOUD_FRONT_URL}${file.key}` : "";

  return (
    <div className="flex flex-col gap-2">
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT_ATTR}
        onChange={handleFileChange}
        className="hidden"
      />

      {file ? (
        <div className="flex items-center justify-between gap-3 border border-border rounded-md p-3 bg-muted/40">
          <div className="flex items-center gap-3 min-w-0">
            <FileText className="shrink-0 size-5 text-primary" />
            <div className="flex flex-col min-w-0">
              <a
                href={downloadHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary hover:underline truncate"
                title={file.filename}
              >
                {file.filename}
              </a>
              <span className="text-xs text-muted-foreground">
                {formatSize(file.size)} •{" "}
                {dayjs(file.uploadedAt).format("DD MMM YYYY HH:mm")}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button asChild size="sm" variant="outline">
              <a href={downloadHref} target="_blank" rel="noopener noreferrer">
                <Download /> Open
              </a>
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? <Loader className="animate-spin" /> : <Upload />}
              Replace
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? <Loader className="animate-spin" /> : <Trash2 />}
            </Button>
          </div>
        </div>
      ) : (
        <Button
          variant="outline"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-fit"
        >
          {uploading ? <Loader className="animate-spin" /> : <Upload />}
          Upload {label}
        </Button>
      )}
      <span className="text-xs text-muted-foreground">
        Allowed: PDF, DOC/DOCX, JPG, PNG, WEBP — max 10 MB
      </span>
    </div>
  );
};

export default ItineraryUpload;
