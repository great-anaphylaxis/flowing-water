git add .
git commit -m %1
git remote add origin https://github.com/great-anaphylaxis/flowing-water.git
git remote -v
git push -f origin master

firebase deploy