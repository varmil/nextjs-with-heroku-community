#!/bin/sh
cd `dirname $0`

git pull origin master

cd api-server
npm i && npm run db:install && npm run pm2
cd ..

cd react-web
npm i && npm run build && npm run pm2
cd ..
