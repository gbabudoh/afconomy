import * as Minio from 'minio';

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || '149.102.155.247',
  port: parseInt(process.env.MINIO_PORT || '9000'),
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY || 'admin',
  secretKey: process.env.MINIO_SECRET_KEY || 'G1veMePass2026',
});

const bucketName = process.env.MINIO_BUCKET || 'afconomy-assets';

export async function ensureBucket() {
  const exists = await minioClient.bucketExists(bucketName);
  if (!exists) {
    await minioClient.makeBucket(bucketName, 'us-east-1');
    // Set public read policy for the bucket
    const policy = {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: { AWS: ['*'] },
          Action: ['s3:GetBucketLocation', 's3:ListBucket'],
          Resource: [`arn:aws:s3:::${bucketName}`],
        },
        {
          Effect: 'Allow',
          Principal: { AWS: ['*'] },
          Action: ['s3:GetObject'],
          Resource: [`arn:aws:s3:::${bucketName}/*`],
        },
      ],
    };
    await minioClient.setBucketPolicy(bucketName, JSON.stringify(policy));
  }
}

export async function uploadFile(
  fileName: string,
  buffer: Buffer,
  contentType: string
) {
  await ensureBucket();
  const objectName = `${Date.now()}-${fileName}`;
  await minioClient.putObject(bucketName, objectName, buffer, buffer.length, {
    'Content-Type': contentType,
  });
  
  const host = process.env.MINIO_ENDPOINT || '149.102.155.247';
  const port = process.env.MINIO_PORT || '9000';
  return `http://${host}:${port}/${bucketName}/${objectName}`;
}

export default minioClient;
