QUALITY=85
for i in ~/Pictures/iPhoto\ Library/Originals/2012/Sep*/*.JPG
do
echo "Converting $i and saving to ${i##*/}..."
convert -strip -auto-orient -blur 64x16 -resize 1920x1080^ -gravity center -extent 1920x1080 -quality $QUALITY "$i" ${i##*/}
done
