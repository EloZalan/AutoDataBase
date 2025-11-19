export const connect = jest.fn();
export const disconnect = jest.fn();

const mongoose = {
    connect,
    disconnect,
    connection: {
        close: jest.fn()
    }
};

export default mongoose;