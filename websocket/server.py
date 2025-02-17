import asyncio
import json
import random

import websockets as ws

from core.controller.controller import Controller
# from core.controller.callbackRegistrator import registerCallbacks

HOST_NAME = "localhost"
PORT = 8765

controller = Controller() # singleton(?)


# def cross_pressed(state):
#     print(state)


async def on_socket_connect(websocket):
    # controller = Controller()
    controller.connect() # We could also connect this before this function idk
    controller.registerCallbacks()

    counter = 0
    while not controller.ds_api.state.ps:
        # controller.ds_api.cross_pressed += cross_pressed
        # controller.update() # Updates the button states (just like Tartan)

        # data = {
        #     "timestamp": counter,
        #     "button_triangle": random.random() > 0.50,
        #     "button_circle": random.random() > 0.5,
        #     "button_cross": random.random() > 0.5,
        #     "button_square": random.random() > 0.5,
        #     "joystick_left_x": random.random() > 0.5,
        #     "joystick_left_y": random.random() > 0.5,
        #     "joystick_right_x": random.random() > 0.5,
        #     "joystick_right_y": random.random() > 0.5,
        #     "trigger_L1": random.random() > 0.5,
        #     "trigger_L2": random.random() > 0.5,
        #     "trigger_R1": random.random() > 0.5,
        #     "trigger_R2": random.random() > 0.5,
        #     "up_dpad": random.random() > 0.5,
        #     "down_dpad": random.random() > 0.5,
        #     "left_dpad": random.random() > 0.5,
        #     "right_dpad": random.random() > 0.5,
        # }
        data = controller.serialize()
        data["timestamp"] = counter

        counter += 1

        await websocket.send(json.dumps(data))
        await asyncio.sleep(0.01)

    controller.close()


async def main():
    print(f"Connecting to websocket client hosted on {HOST_NAME} of {PORT}")

    # controller = Controller()

    # register callbacks
    # controller.registerCallbacks() # register callbacks BEFORE infinite loop actually maybe not


    server = await ws.serve(on_socket_connect, HOST_NAME, PORT)
    await server.wait_closed()

    print(f"Terminating server")


if __name__ == "__main__":
    asyncio.run(main())


