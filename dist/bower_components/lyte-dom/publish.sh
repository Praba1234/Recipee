sudo node build.js
sudo cp package.json dist/package.json
cd dist
sudo npm unpublish --registry http://integ-docker:4873 --force
sudo npm publish --registry http://integ-docker:4873
cd ..
sudo rm -rf dist;
