#!/bin/bash

if [ "$#" -ne 1 ]; then
  echo "Usage: ./push-prod.sh <message>"
elif [ ! -d "../../prod/master-p" ]; then
  echo "../../prod/master-p is not a valid directory"
else
  cp -r ./build ../../prod/master-p/
  cd ../../prod/master-p/
  git add ./build
  git commit -m "$1"
  git push origin master
  ssh -t aidan@abarbieux.com "cd ~/apps/web/prod/ ; git pull ; pm2 restart frontend ; exit ; bash"
fi
