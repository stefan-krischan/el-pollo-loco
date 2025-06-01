@echo off
echo Start: Pull changes from the remote repository
git pull

echo Add all changes
git add .

echo Start interactive commit editor
git commit

echo Send the changes to the remote repository
git push
echo Done!