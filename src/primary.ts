import cluster from 'cluster';
import os from 'os';
import path from 'path';
import logger from '$configs/logger.config';
import { cwd } from 'process';

const cpuCores = os.cpus().length;

cluster.setupPrimary({
  exec: path.join(cwd(), 'src', 'common', 'bootstrap.ts'),
});

for (let i = 0; i < cpuCores; i++) {
  cluster.fork();
}

let retryCount = 0;
const maxRetries = 5;

cluster.on('exit', (worker) => {
  if (retryCount < maxRetries) {
    logger.info(
      `Worker ${worker.process.pid} died. Attempting restart (${retryCount + 1}/${maxRetries})`,
    );

    setTimeout(() => {
      cluster.fork();
    }, 2000); // Delay before forking a new worker

    retryCount++;
  } else {
    logger.info(`Max retries reached. Not forking new worker.`);
  }
});
