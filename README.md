# nextjs-with-heroku-community

## Requirement
* `Node.js 10.3.0` (for client and api-server)
* `MySQL >= 5.7` (for api-server)

## How to Use (dev)

### client + web-server
```sh
cd react-web
npm i
npm run dev

# see --> http://localhost:3000/view/home
```

### api-server
```sh
cd api-server
npm i
npm run dev

# curl http://localhost:5000
```

### DB migration (run it when table definition changed)
```sh
cd api-server
npm run db:init
```
* port: `3306`, db: `commune` で外部から接続できる環境が予め必要です。
