import app from './shared/infrastructure/http/app';

// Jobs
import './shared/infrastructure/outbox/implementation/node-cron/index';

app.start();
