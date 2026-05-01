# url shortner system design

### so here is what we should do

- [x] create the server
- [ ] create three endpoints:
    1. /api/shorten
    2. /api/:url **redirect: status 302**
    3. /api/analytics **should be private and guarded in the frontend**

- [ ] make heartbeat and gossip endpoints:
    1. /api/healthCheck
    2. **I'm not sure about this too**
- [ ] make database models:
    1. url table : id | shortUrl |originalUrl | createdAt |
    2. analytics table : **actually I don't know but I guess we could atleast have the count**

- [ ] add the url shortening logic by using the counter way :
    1. adding some range to each shorten service
    2. caching the range of each shorten service
    3. provide the range from the redis cache service to the shorten service on **startup**
    ---
- [ ] Add an mq using rabbit mq between services **worth it? I don't know I don't even know where to add it**

- [ ] The analytics service should write to a cache and the cache should flush to the database every 10 seconds or so

---
- [ ] deployment : more on this later