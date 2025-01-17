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
docker build . -t docker-web-gui --load
docker run -p 3230:3230 -v /usr/local/bin/docker:/usr/local/bin/docker -v /var/run/docker.sock:/var/run/docker.sock --name docker-web-gui-$RANDOM docker-web-gui
docker rm $(docker stop $(docker ps -a -q --filter ancestor=docker-web-gui --format="{{.ID}}"))
