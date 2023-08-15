#!/bin/sh

curl --silent -H "api-key: ${DEV_API_KEY}" "https://dev.to/api/articles/me/published?per_page=10" | jq '.[] | { title: .title, views: .page_views_count, reactions: .positive_reactions_count, public_reactions: .public_reactions_count, comments: .comments_count }'
