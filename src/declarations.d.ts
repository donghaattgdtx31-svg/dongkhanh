// Cho các định dạng ảnh
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";

// Cho video MP4
declare module "*.mp4" {
  const src: string;
  export default src;
}
