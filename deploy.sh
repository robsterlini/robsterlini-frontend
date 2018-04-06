#!/bin/bash
if [ "$TRAVIS_BRANCH" == "dev" ] || [ "$TRAVIS_BRANCH" == "qa" ]
then
  curl=$NETLIFY_CURL_DEV
  if [ "$TRAVIS_BRANCH" == "qa" ]
  then
    curl=$NETLIFY_CURL_QA
  fi
  curl -X POST -d '' "https://api.netlify.com/build_hooks/${curl}"
fi
