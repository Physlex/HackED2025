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
            "button_triangle": 1 if random.random() > 0.5 else 0,
            "button_circle": 1.01 if random.random() > 0.5 else -0.01,
            "button_cross": 1.02 if random.random() > 0.5 else -0.02,
            "button_square": 1.03 if random.random() > 0.5 else -0.03,
            "joystick_left_x": 1.04 if random.random() > 0.5 else -0.04,
            "joystick_left_y": 1.05 if random.random() > 0.5 else -0.05,
            "joystick_right_x": 1.06 if random.random() > 0.5 else -0.06,
            "joystick_right_y": 1.07 if random.random() > 0.5 else -0.07,
            "trigger_L1": 1.08 if random.random() > 0.5 else -0.08,
            "trigger_L2": 1.09 if random.random() > 0.5 else -0.09,
            "trigger_R1": 1.10 if random.random() > 0.5 else -0.10,
            "trigger_R2": 1.11 if random.random() > 0.5 else -0.11,
        }

        counter += 1

        await websocket.send(json.dumps(data))
        await asyncio.sleep(0.8)

async def main():
    server = await websockets.serve(send_random_data, "localhost", 8765)
    await server.wait_closed()

asyncio.run(main())
