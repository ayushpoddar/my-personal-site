#!/bin/sh
#
curl --silent -H "api-key: ${DEV_API_KEY}" "https://dev.to/api/followers/users?per_page=1000" | jq '. | length'
