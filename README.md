# nextjs-community

## Requirement
* `Node.js 10.3.0` (for client and api-server)
* docker-compose


## Note
* `react-web` がフロントエンド（兼Webサーバ）
* `api-server` がAPIサーバ
* 開発時はターミナルを2枚開いて、`react-web` `api-server` 別々に起動してください


## How to Use (dev)
### 0. env
```sh
cd react-web
cp .env.sample.json .env.json
# please modify env variables to suit your environment
```

### 1. api-server
```sh
cd api-server
npm i
npm run dev
```

### 2. mysql (docker)
```sh
docker-compose up -d
```

### 3. DB migration (run it first-time and when table definition changed)
```sh
cd api-server
npm run db:install


### option : reset all data
npm run db:init
```

### 4. client + web-server
```sh
cd react-web
npm i
npm run dev
```


## URL Example
```
# 管理者Signup画面。まずここで最初の管理者を作成してください。
# その後、他のページへ移動してください。
http://localhost:3000/admin/site/edit/welcome/signup

# 管理者投稿管理画面
http://localhost:3000/admin/post/list

# ユーザ、管理者Signin画面
http://localhost:3000/view/signin

# ユーザHome画面
http://localhost:3000/view/home
```


## Trouble-shooting

###### Q. HTTPS-PORTAL cannot sign the domain
change dockerd settings, `"userland-proxy": false`  
https://stackoverflow.com/a/44414882  


###### Q. Why am I getting a SSL mismatch error?
see: [cloudflare settings](https://support.cloudflare.com/hc/en-us/articles/200170616-Why-am-I-getting-a-SSL-mismatch-error-)


###### Q. MySQLに接続できません
Vagrant && private_network を使用している場合、 `api-server/config/database.json` の設定を変更する必要があるかも知れません。
