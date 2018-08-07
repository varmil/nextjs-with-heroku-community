# nextjs-with-heroku-community

## Requirement
* `Node.js 10.3.0` (for client and api-server)
* `MySQL >= 5.7` (for api-server)

## How to Use (dev)
### 0. env
```sh
cd react-web
cp .env.sample.json .env.json
# please modify env variables to suit your environment
```

### 1. client + web-server
```sh
cd react-web
npm i
npm run dev

# see --> http://localhost:3000/view/home
```

### 2. api-server
```sh
cd api-server
npm i
npm run dev

# curl http://localhost:5000
```

### 3. mysql (docker)
```sh
docker-compose up -d
```

### 4. DB migration (run it when table definition changed)
```sh
cd api-server
npm run db:install


### option : reset all data
npm run db:init
```
* port: `3306`, db: `commune` で外部から接続できる環境が予め必要です。


## Trouble-shooting

###### Q. HTTPS-PORTAL cannot sign the domain
change dockerd settings, `"userland-proxy": false`  
https://stackoverflow.com/a/44414882  
