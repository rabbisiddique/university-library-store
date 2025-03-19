"use client";
import config from "@/lib/config";
import { cn } from "@/lib/utils";
import { IKImage, IKUpload, IKVideo, ImageKitProvider } from "imagekitio-next";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";
const {
  env: {
    imagekit: { publicKey, privateKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }
    const data = await response.json();
    const { signature, expire, token } = data;

    return { token, expire, signature };
  } catch (error: any) {
    throw new Error(`Authenticator request failed: ${error.message}`);
  }
};

interface Props {
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  onFileChange: (filePath: string) => void;
  value?: string;
}

const FileUpload = ({
  onFileChange,
  type,
  accept,
  placeholder,
  folder,
  variant,
  value,
}: Props) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string | null }>(null);
  const [progress, setProgress] = useState<number>(0);
  const styles = {
    button:
      variant === "dark"
        ? "bg-dark-300"
        : "bg-light-600 border-gray-100 border",
    placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
    text: variant === "dark" ? "text-light-100" : "text-dark-400",
  };
  const onError = (error: any) => {
    toast.error(`${type} upload failed`, {
      description: `Your ${type} could not be uploaded. Please try again.`,
    });
  };
  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);
    toast(` ${type} uploaded successfully`, {
      description: `${res.filePath} uploaded successfully!`,
    });
    setTimeout(() => {
      setProgress(0);
    }, 2000);
  };
  const onUploadProgress = ({
    loaded,
    total,
  }: {
    loaded: number;
    total: number;
  }) => {
    const percent = Math.round((loaded / total) * 100);
    setProgress(percent);
  };

  const onValidate = (file: File) => {
    if (type === "image") {
      if (file.size > 20 * 1024 * 1024) {
        toast("file size too large", {
          description:
            "Please upload a file but that is less than 20MB in size",
        });
        return false;
      }
    } else if (type === "video") {
      if (file.size > 50 * 1024 * 1024) {
        toast(
          "File size too large",
          {
            description: "Please upload a file that is less than 50MB in size",
          }
          // variant: "destructive",
        );
        return false;
      }
    }
    return true;
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        onUploadStart={() => setProgress(0)} // Reset progress on upload start
        onUploadProgress={onUploadProgress}
        validateFile={onValidate}
        folder={folder}
        accept={accept}
        className="hidden"
      />

      <button
        className={cn("upload-btn", styles.button)}
        onClick={(e) => {
          e.preventDefault();

          if (ikUploadRef.current) {
            // @ts-ignore
            ikUploadRef.current?.click();
          }
        }}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
          className="object-contain"
        />

        <p className={cn("text-base", styles.placeholder)}>{placeholder}</p>
      </button>

      {progress >= 0 && progress === 100 && (
        <div
          className={`${
            progress >= 0 &&
            "relative w-full h-4 bg-gray-300 rounded-full overflow-hidden mt-2"
          }`}
        >
          <div
            className={`h-full transition-all duration-500 ease-out ${
              progress < 50
                ? "bg-red-500"
                : progress < 80
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
            style={{ width: `${progress}%` }}
          >
            <span
              className={`${
                progress >= 0 &&
                "absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center text-xs text-white font-semibold"
              }`}
            >
              {progress}%
            </span>
          </div>
        </div>
      )}

      {file &&
        (type === "image" ? (
          <IKImage
            alt={file.filePath ?? ""}
            path={file.filePath ?? ""}
            width={500}
            height={300}
          />
        ) : type === "video" ? (
          <IKVideo
            path={file.filePath ?? ""}
            controls={true}
            className="h-96 w-full rounded-xl"
          />
        ) : null)}
    </ImageKitProvider>
  );
};

export default FileUpload;
