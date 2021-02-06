PKG_NAME=`grep -o ' packageName \"\(.*\)\"' src/package.ent | awk '{print $2}' | sed 's/"//g'`
VERSION=`grep -o ' packageVersion \"\(.*\)\"' src/package.ent | awk '{print $2}' | sed 's/"//g'`

# Create the dist directory if needed
if [[ ! -d dist ]]
	then mkdir -p dist/package
else
	rm dist/package/*.*
fi

# Copy files
cp src/*.css dist/package/
cp src/*.html dist/package/
cp src/*.manifest dist/package/

# Transform the package.xml file
xsltproc --novalid --xinclude --output dist/package/package.xml lib/packager.xslt src/package.xml


# Build the ZIP file
zip -j "dist/${PKG_NAME}-${VERSION}.zip" dist/package/* -x \*.DS_Store
