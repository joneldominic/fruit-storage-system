import cron from 'node-cron';
import OutboxJob from '../outboxJob';
import outboxRepository from '../../../../domain/outbox/repos/implementations';

const outboxJob = new OutboxJob(outboxRepository);

const cron5SecondsInterval = '*/5 * * * * *';

const cronConfig = {
  name: 'transaction-outbox-task',
  scheduled: true,
  recoverMissedExecutions: false
};

cron.schedule(cron5SecondsInterval, () => outboxJob.execute(), cronConfig);
