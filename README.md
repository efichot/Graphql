# Real time chat app

Build with MERN + graphql

## Technologies

1.  Apollo Server v2
2.  Apollo Client v2
3.  Mongoose ORM
4.  Web Sockets
5.  JWT Auth
6.  Gravatar

## MongoDev setup with Docker

```sh
# Start a MongoDB container on port 27017 and create a 'root' user on the 'admin' database
docker run -d --name mongodb -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=secret mongo

# Run the mongo CLI client on the container as 'root' against 'admin' database and connect to 'chat'
docker exec -it mongodb mongo -u root -p secret --authenticationDatabase admin chat

# Inside the client, create an admin user for the 'chat' database
db.createUser({
  user: 'admin', pwd: 'secret', roles: ['readWrite', 'dbAdmin']
})
```
