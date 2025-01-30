import multer from "multer";
import multerS3 from "multer-s3";
import { Request } from "express";

import { s3 } from "../awsS3Config";
import { ENV_variables } from "../constants";

const upload = multer({
  storage: multerS3({
    s3: s3 as any,
    bucket: ENV_variables.AWS_S3_BUCKET,
    acl: "public-read",
    metadata: function (
      req: Request,
      file: any,
      cb: (error: Error | null, metadata?: object) => void,
    ) {
      cb(null, { fieldName: file.fieldname });
    },
    key: (
      req: Request,
      file: any,
      cb: (error: Error | null, key?: string) => void,
    ) => {
      const uniqueName = `backgrounds/${Date.now()}-${file.originalname}`;
      cb(null, uniqueName);
    },
  }),
});

export default upload;
