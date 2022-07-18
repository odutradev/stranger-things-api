/**
 * @credits https://github.com/umgustavo/capybara-api
 */

import rateLimit from 'express-rate-limit';


const apiLimiter = rateLimit({
    message: {
        error: {
            message: 'Too many requests. Try again later',
        },
    },
    windowMs: 1000 * 30,
    max: 50,
    standardHeaders: false,
    legacyHeaders: false,
});


export default apiLimiter