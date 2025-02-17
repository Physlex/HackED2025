import asyncio
import json
import random

import websockets as ws

from core.controller.controller import Controller

HOST_NAME = "localhost"
PORT = 8765

def cross_pressed(state):
    print(state)


async def send_random_data(websocket):
    controller = Controller()
    controller.connect()

    counter = 0
    while not controller.ds_api.state.cross:
        controller.ds_api.cross_pressed += cross_pressed

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
        await asyncio.sleep(0.01)

    controller.close()


async def main():
    print(f"Connecting to websocket client hosted on {HOST_NAME} of {PORT}")

    server = await ws.serve(send_random_data, HOST_NAME, PORT)
    await server.wait_closed()

    print(f"Terminating server")


if __name__ == "__main__":
    asyncio.run(main())
