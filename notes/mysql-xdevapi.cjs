var mysqlx = require('@mysql/xdevapi')
// npm install @mysql/xdevapi --save --save-exact
var client = mysqlx.getClient(
  { user: 'root', host: 'localhost', port: 33060 }, 
  { pooling: { enabled: true, maxIdleTime: 5000, maxSize: 25, queueTimeout: 20000 } }
);

client.getSession()
  .then(session => {
    console.log(session.inspect())
    return session.close() // the connection becomes idle in the client pool
  })
  .then(() => {
    return client.getSession()
  })
  .then(session => {
    console.log(session.inspect())
    return client.close() // closes all connections and destroys the pool
  })

// Or

const mysqlx = require('@mysql/xdevapi');
var client = mysqlx.getClient('root@localhost?connect-timeout=5000')
client.getSession()
  .catch(err => {
	  console.log(err.message) // "Connection attempt to the server was aborted. Timeout of 5000 ms was exceeded."
  })

// Or

const mysqlx = require('@mysql/xdevapi');
var client = mysqlx.getClient('mysqlx://root:passwd@[localhost:33060, 127.0.0.1:33060]?connect-timeout=5000')
client.getSession()
  .catch(err => {
    // connection could not be established after 10 seconds (5 seconds for each server)
    console.log(err.message); // All server connection attempts were aborted. Timeout of 5000 ms was exceeded for each selected server.
  });
