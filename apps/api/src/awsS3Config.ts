import * as AWS from "@aws-sdk/client-s3";

import { ENV_variables } from "./constants";

export const s3 = new AWS.S3({
  region: 'eu-north-1',
  credentials: {
    accessKeyId: ENV_variables.AWS_ACCESS_KEY_ID,
    secretAccessKey: ENV_variables.AWS_SECRET_ACCESS_KEY,
  },
});
