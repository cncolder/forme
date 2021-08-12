#!/usr/bin/env sh

set -e

USERNAME=cncolder
REPO=forme
ROOT="$(if [ "`git rev-parse --show-cdup`" != "" ]; then cd `git rev-parse --show-cdup`; fi; pwd)"

cd ${ROOT}/dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:${USERNAME}/${REPO}.git master:gh-pages

cd -
