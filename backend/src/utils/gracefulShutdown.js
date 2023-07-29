const gracefulShutdown = (connection, server)=>{
    console.log('Closing database connection...')
    connection.close().then(() => {
        console.log('Database connection closed.')
        console.log('Shutting down the server...')
        server.close(() => {
            console.log('Server closed.')
            process.exit(0)
        })
    }).catch((error) => {
        console.error('Error while closing the connection:', error)
        process.exit(1);
    })
}

module.exports = gracefulShutdown