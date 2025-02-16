import asyncio
import websockets
import json
import random
import time


async def send_random_data(websocket):
    counter = 0
    
    while True:
        
        data = {
            "timestamp": counter,
            "value": random.random()
        }

        counter += 1

        await websocket.send(json.dumps(data))
        await asyncio.sleep(0.1)

async def main():
    server = await websockets.serve(send_random_data, "localhost", 8765)
    await server.wait_closed()

asyncio.run(main())

