export NODE_OPTIONS=--openssl-legacy-provider
rm backend/web/ -rf
rm client/build -rf
cd client
npm run build
cd ..
mkdir -p backend/web
cp client/build/* backend/web/ -r
node app.js