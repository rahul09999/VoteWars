import { Queue, Worker } from 'bullmq';
import { defaultQueueOptions, redisConnection } from '../config/queue.js';
import { sendMail } from '../config/mail.js';
export const emailQueueName = "emailQueue";
export const emailQueue = new Queue(emailQueueName, {
    connection: redisConnection,
    defaultJobOptions: defaultQueueOptions
});
export const emailWorker = new Worker(emailQueueName, async (Job) => {
    const data = Job.data;
    await sendMail(data.to, data.subject, data.body);
    console.log(`Queue job data: ${data}`);
}, {
    connection: redisConnection,
});
