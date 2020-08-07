#!/bin/bash

if [ "$#" -ne 1 ]; then
  echo "Usage: ./push-prod.sh <message>"
elif [ ! -d "../prod-master/" ]; then
  echo "../prod-master/ is not a valid directory"
else
  npm run build
  rm -rf ../prod-master/front-end
  cp -r ./build ../front-end
  cd ../prod-master
  git add ./front-end
  git commit -m "$1"
  git push origin master
  ssh -t aidan@abarbieux.com "cd ~/web/prod-master/ ; rm -rf ./build ; git fetch --all ; git reset --hard origin/master ; pm2 restart frontend ; exit ; bash"
fi
