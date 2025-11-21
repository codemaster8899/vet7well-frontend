#!/usr/bin/env bash

npm install
npm run build

# deploy to the server
scp -r dist/spa/* peth:/home/vhosts/7well.net/dev/