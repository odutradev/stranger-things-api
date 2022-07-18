import chalk from 'chalk';
import log from 'gulog';

import { app } from './app.js';

log.setup({
    prefix: '(StrangerThings)',
});


const PORT = process.env.PORT || 3000
const server = app.listen(PORT, async () => {
    log.info(`🚀 Server iniciado em ${chalk.cyan(PORT)}.`);
});

process.on('SIGINT', () => {
    server.close()
    log.info('App finalizado')
})