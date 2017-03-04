# Download Instructions

Required software:

1. MongoDB version 2.4 or higher
2. Nodejs version 7.0 or higher

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
- Run mongod from wherever it installs
- Download node and npm
```
https://www.mongodb.com/download-center
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
- If it doesn't work, make sure that ```mongod``` is running

```
npm run show
```
- It shows you your entire database, should be around 100 entries at this point (unless you built or populated more than once)

# All done!
Congrats! Your environment is working. Use the following command to run the examples:

```bash
npm run i
```
Where 'i' is the example #, from 1 to 4 (inclusive).
