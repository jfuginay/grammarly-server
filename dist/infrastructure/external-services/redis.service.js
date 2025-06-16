"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
class RedisService {
    constructor() {
        this.client = new ioredis_1.default(process.env.REDIS_URL || 'redis://localhost:6379');
    }
    async get(key) {
        try {
            return await this.client.get(key);
        }
        catch (error) {
            console.error('Redis get error:', error);
            return null;
        }
    }
    async set(key, value, ttlSeconds) {
        try {
            if (ttlSeconds) {
                await this.client.set(key, value, 'EX', ttlSeconds);
            }
            else {
                await this.client.set(key, value);
            }
        }
        catch (error) {
            console.error('Redis set error:', error);
        }
    }
    async del(key) {
        try {
            await this.client.del(key);
        }
        catch (error) {
            console.error('Redis del error:', error);
        }
    }
    async flush() {
        try {
            await this.client.flushall();
        }
        catch (error) {
            console.error('Redis flush error:', error);
        }
    }
}
exports.RedisService = RedisService;
//# sourceMappingURL=redis.service.js.map