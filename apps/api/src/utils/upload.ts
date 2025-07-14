import multer from 'multer';

// This upload middleware uses memory storage. Files are uploaded to Supabase in the controller logic.
const upload = () => {
  return multer({
    storage: multer.memoryStorage(),
  });
};

export default upload;
