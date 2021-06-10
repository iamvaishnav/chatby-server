let io;

module.exports = {
    init: (server) => {
        io = require('socket.io')(server);
        return io;
    },

    getSocket: () => {
        if (!io) {
            throw new Error('socket.io is not initialized');
        }

        return io;
    },
};
