#!/bin/bash

set -e

if [ `git branch | grep gh-pages` ]; then
  git branch -D gh-pages
fi

git checkout -b gh-pages
npm run docs

# Move generated docs to root and delete everything else.
find . -maxdepth 1 ! -name '.' ! -name '..' ! -name 'docs' ! -name '.git' ! -name '.gitignore' -exec rm -rf {} \;
mv docs/* .
rm -R docs/

# Push to gh-pages.
ORIGIN_URL=`git config --get remote.origin.url`

git config user.name "$GITHUB_USERNAME"
git config user.email "$GITHUB_EMAIL"
git add -fA
git commit --allow-empty -m "[Skip CI] $(git log -1 --pretty=%B)"
git push -f $ORIGIN_URL gh-pages

echo "Successfully published docs to GitHub Pages"
