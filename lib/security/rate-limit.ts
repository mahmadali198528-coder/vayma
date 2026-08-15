const attempts = new Map<string,{count:number;resetAt:number}>();
export function rateLimit(key:string, limit=5, windowMs=60_000){const now=Date.now();const entry=attempts.get(key);if(!entry||entry.resetAt<now){attempts.set(key,{count:1,resetAt:now+windowMs});return true}if(entry.count>=limit)return false;entry.count++;return true}
