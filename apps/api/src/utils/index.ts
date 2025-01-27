import { s3 } from "../awsS3Config";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.round(n * 255).toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export const getS3Key = (imageUrl: string, bucketName: string): string => {
  const parsedUrl = new URL(imageUrl);
  const pathParts = parsedUrl.pathname.split('/').filter(part => part !== '');

  if (pathParts[0] === bucketName) {
    return pathParts.slice(1).join('/');
  } else {
    return parsedUrl.pathname.substring(1);
  }
};

export const deleteS3Object = async (bucket: string, key: string): Promise<void> => {
  try {
    await s3.send( new DeleteObjectCommand({ Bucket: bucket, Key: key }))
  } catch (error) {
    console.error("Error deleting S3 object:", error);
    throw new Error("Failed to delete S3 object");
  }
};

