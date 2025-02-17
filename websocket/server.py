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
            "button_triangle": random.random() > 0.50,
            "button_circle": random.random() > 0.5,
            "button_cross": random.random() > 0.5,
            "button_square": random.random() > 0.5,
            "joystick_left_x": random.random() > 0.5,
            "joystick_left_y": random.random() > 0.5,
            "joystick_right_x": random.random() > 0.5,
            "joystick_right_y": random.random() > 0.5,
            "trigger_L1": random.random() > 0.5,
            "trigger_L2": random.random() > 0.5,
            "trigger_R1": random.random() > 0.5,
            "trigger_R2": random.random() > 0.5,
            "up_dpad": random.random() > 0.5,
            "down_dpad": random.random() > 0.5,
            "left_dpad": random.random() > 0.5,
            "right_dpad": random.random() > 0.5,
        }

        counter += 1

        await websocket.send(json.dumps(data))
        await asyncio.sleep(0.8)


async def main():
    server = await websockets.serve(send_random_data, "localhost", 8765)
    await server.wait_closed()


if __name__ == "__main__":
    asyncio.run(main())
