DIR_GIG_DATA=/Users/nuwan.senaratna/Not.Dropbox/_CODING/data/gig-data

cp -r $DIR_GIG_DATA/* public/data/gig-data/

git add .
git commit -m "Copied Data from gig-data"
git push origin main
