docker compose down
set -e

export NODE_OPTIONS=--openssl-legacy-provider
rm backend/web/ -rf
rm client/build -rf

cd backend
npm install

cd ../client
npm install
npm run build
cd ..
mkdir -p backend/web
cp client/build/* backend/web/ -r
#node app.js
docker build . -t breakroom --load
docker compose up -d