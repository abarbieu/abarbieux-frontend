#!/bin/bash

if [ "$#" -lt 1 ]; then
  echo "Usage: ./push-prod.sh <message> [update images?]"
elif [ ! -d "../prod-master/" ]; then
  echo "../prod-master/ is not a valid directory"
else
  if [ "$#" -eq 2 ]; then
    node imageScraper.js
  fi
  git add *
  git commit -m "$1"
  npm run build
  rm -rf ../prod-master/front-end
  cp -r ./build ../prod-master/front-end
  cd ../prod-master
  git add ./front-end
  git commit -m "$1"
  git push origin master
  ./update-prod.sh
fi
