#!/bin/bash

set -e

git checkout gh-pages
git pull origin gh-pages
git merge master --no-edit
npm run lint
npm test
npm run demo-dist
cp demo/dist/*.* .
git add index.html app.css index.js
git commit -m 'Update gh-pages files'
git push origin gh-pages
git checkout master
