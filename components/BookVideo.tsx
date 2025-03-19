"use client";
import config from "@/lib/config";
import { IKVideo, ImageKitProvider } from "imagekitio-next";
const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;
const BookVideo = ({ videoUrl }: { videoUrl: string }) => {
  return (
    <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint}>
      <IKVideo path={videoUrl} controls={true} className="w-full rounded-xl" />
    </ImageKitProvider>
  );
};

export default BookVideo;
