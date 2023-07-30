# !/bin/bash

if [ "$CF_PAGES_BRANCH" == "main" ]; then
  echo "Deploying in production"
  hugo -e production
else
  echo "Deploying to preview"
  hugo -b $CF_PAGES_URL -e staging -D --buildFuture
fi
