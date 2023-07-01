# !/bin/bash

if [ "$CF_PAGES_BRANCH" == "main" ]; then
  echo "Deploying in production"
  npm install && hugo -e production
else
  echo "Deploying to preview"
  npm install && hugo -b $CF_PAGES_URL -e staging -D
fi
