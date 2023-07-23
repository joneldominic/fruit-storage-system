import { SQSClient } from '@aws-sdk/client-sqs';

const sqsClient = new SQSClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_ID || 'AWS_ACCESS_ID_NOT_FOUND',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'AWS_SECRET_ACCESS_KEY_NOT_FOUND'
  }
});

export default sqsClient;
