# Downloads
Install MongoDB and set it up, and install node

### Mac OS
```bash 
brew install mongo
brew install node
sudo mongod
```

### Linux
- install mongo with package manager
- same with node
- With aptitude the following will work:
```
sudo apt-get install mongodb
sudo apt-get install nodejs
sudo mongod
```

### Windows
- Download from mongodb's site
```
https://www.mongodb.com/download-center
```
- Run mongod from wherever it installs
- Download node and npm
```
https://nodejs.org/en/download/
```

# Clone and build
```
git clone https://github.com/Branch-Bunch/Scalability-Workshop.git
npm run build
```

# Test setup
```
npm test
```
- It should show you some data, and say that it works
