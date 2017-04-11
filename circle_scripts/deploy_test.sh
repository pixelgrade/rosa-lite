#!/bin/bash
# Deploy this theme in the demos repository on the test branch, which is the stagging one

# let's set some variables
E_XCD=86       # Can't change directory?
THEME_NAME=rosa
THEME_STAGGING_BRANCH=test
DEMO_REPO=demos
DEMO_BRANCH=test

#=== Stop your keyboard here ===

# Ensure we are on the right branch
git checkout $THEME_STAGGING_BRANCH || {
    echo "Cannot find the branch $THEME_STAGGING_BRANCH"
    exit $E_XCD
}

echo "=== Init Deploy ..."
cd ../ || {
    echo "Cannot change to necessary directory." >&2
    exit $E_XCD
}

ls

echo "=== Cloning demos if the folder doesn't exists ..."

if [ -e $DEMO_REPO ]
 then
    echo 'folder already exists'
 else
    git config --global user.name $DEMOGITHUBUSER
    git config --global user.email $DEMOGITHUBEMAIL
    git clone https://$DEMOGITHUBUSER:$DEMOGITHUBPASS@github.com/pixelgrade/$DEMO_REPO.git -b $DEMO_BRANCH
fi

# list just to see where am I
ls

echo "=== Move theme in demos"
#  move the theme in the demos repository but exclude the build files
rsync -av --delete --exclude='.git' --exclude='.gitignore' --exclude='wp-cli.phar' --exclude='wordpress' --exclude='tests' --exclude='.travis' --exclude='circle_scripts' --exclude='.sass_cache' --exclude='node_modules' ./$THEME_NAME $DEMO_REPO/wp-content/themes || {
    echo "Cannot copy in demos." >&2
    exit $E_XCD;
}

echo "=== Go in demos"

cd ./$DEMO_REPO/wp-content/themes/$THEME_NAME || {
    echo "Cannot change dir in demos." >&2
    exit $E_XCD;
}

echo "=== Commit new theme"

git add .
git commit -m "Auto update $THEME_NAME on branch $THEME_STAGGING_BRANCH via CircleCi"

echo "=== Push new theme"

echo $DEMO_BRANCH

git push origin $DEMO_BRANCH

echo "Done thing"
exit 0