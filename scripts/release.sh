#!/bin/bash

set -e

# Set variables.
ORIGIN_URL=`git config --get remote.origin.url`

# Publish to NPM.
echo "Publishing release to NPM..."

if [[ -n "$NPM_AUTH" ]]; then
  echo "//registry.npmjs.org/:_authToken=$NPM_AUTH" >> ~/.npmrc
  npm publish
  echo "Done"
else
  echo "Operation failed because NPM_AUTH was not set"
fi

# Publish docs to gh-pages branch.
echo "Publishing docs to gh-pages branch..."

if [ `git branch | grep gh-pages` ]
then
  git branch -D gh-pages
fi
git checkout -b gh-pages
npm run docs

# Move generated docs to root and delete everything else.
find . -maxdepth 1 ! -name '.' ! -name '..' ! -name 'docs' ! -name '.git' ! -name '.gitignore' -exec rm -rf {} \;
mv docs/* .
rm -R docs/

# Push to gh-pages.
git config user.name "$GITHUB_USERNAME"
git config user.email "$GITHUB_EMAIL"
git add -fA
git commit --allow-empty -m "$(git log -1 --pretty=%B) [ci skip]"
git push -f $ORIGIN_URL gh-pages

echo "Done"

exit 0
