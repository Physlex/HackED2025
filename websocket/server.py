import asyncio
import websockets
import json
import random

HOST_NAME = "localhost"
PORT_NUMBER = 8765


async def send_random_data(websocket):

    counter = 0
    while True:
        data = {"timestamp": counter, "value": random.random()}
        counter += 1

        await websocket.send(json.dumps(data))
        await asyncio.sleep(0.1)


async def main():
    print(f"Server {HOST_NAME} starting on port {PORT_NUMBER}")
    server = await websockets.serve(send_random_data, HOST_NAME, PORT_NUMBER)
    await server.wait_closed()
    print(f"Terminating server...")


if __name__ == "__main__":
    asyncio.run(main())
