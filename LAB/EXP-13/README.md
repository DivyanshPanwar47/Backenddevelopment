# Experiment 13: Installing and Connecting MongoDB

This experiment records the MongoDB installation and verification workflow needed by Experiments 13A and 13B. The application code uses Mongoose to create databases and collections automatically when data is first written.

## Learning objectives

- Install MongoDB Community Server and MongoDB Shell (`mongosh`) on Windows.
- Start and verify a local MongoDB service.
- Use MongoDB Compass to inspect databases and collections.
- Understand the alternative MongoDB Atlas connection string.
- Connect a Node.js application with Mongoose.

## Windows setup

1. Download MongoDB Community Server from <https://www.mongodb.com/try/download/community>.
2. Run the MSI installer and choose **Install MongoD as a Service**.
3. Install MongoDB Shell from <https://www.mongodb.com/try/download/shell> if `mongosh` is not included in your installation.
4. Install MongoDB Compass from <https://www.mongodb.com/try/download/compass> if you want a graphical interface.

Verify the tools from a new PowerShell window:

```powershell
mongod --version
mongosh --version
```

If MongoDB was installed as a Windows service, it can be controlled with:

```powershell
Get-Service MongoDB
Start-Service MongoDB
Stop-Service MongoDB
```

Connect locally:

```powershell
mongosh "mongodb://127.0.0.1:27017"
```

Run these commands inside `mongosh`:

```javascript
use backend_lab
db.healthcheck.insertOne({ message: 'MongoDB is working', createdAt: new Date() })
db.healthcheck.find()
```

Compass uses the same connection string:

```text
mongodb://127.0.0.1:27017
```

## MongoDB Atlas alternative

1. Create a free cluster at <https://www.mongodb.com/cloud/atlas>.
2. Create a database user and allow your development IP address.
3. Choose **Connect → Drivers** and copy the connection string.
4. Put it in an ignored `.env` file, replacing the username, password and database name.

```text
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority
```

Never commit credentials or a real connection string to GitHub.

## Mongoose connection smoke test

Experiments 13A and 13B include the following connection pattern:

```js
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection failed:', error.message));
```

Mongoose creates the database and a model's collection when the first document is saved; collections do not need to be created manually in Compass.

## Troubleshooting

- `ECONNREFUSED 127.0.0.1:27017`: start the MongoDB service or use a valid Atlas URI.
- `mongosh is not recognized`: add the MongoDB Shell `bin` directory to `PATH`, then open a new terminal.
- Atlas connection fails: check the database user, password URL encoding, and IP access list.
- Authentication errors in the applications: confirm that `.env` contains the same `MONGODB_URI` used by the running database.
