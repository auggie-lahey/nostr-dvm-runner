export NODE_OPTIONS=--openssl-legacy-provider

cd client
npm run build
cd ..
cp client/build/* backend/web/ -r
node app.js