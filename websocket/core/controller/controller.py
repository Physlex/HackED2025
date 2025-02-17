from pydualsense import pydualsense


class ControllerState:

    def __init__(self):
        self.button_triangle_pressed = False
        self.button_circle_pressed = False
        self.button_cross_pressed = False
        self.button_square_pressed = False

        self.trigger_L1_pressed = False
        self.trigger_L2_pressed = False
        self.trigger_R1_pressed = False
        self.trigger_R2_pressed = False

        self.up_dpad_pressed = False
        self.down_dpad_pressed = False
        self.left_dpad_pressed = False
        self.right_dpad_pressed = False

        # self.joystick_left_x = ????
        # self.joystick_left_y = ????
        # self.joystick_right_x = ????
        # self.joystick_right_y = ????


class Controller(object):
    def __init__(self):
        self.ds_api = pydualsense()
        self.state = ControllerState()

    def connect(self):
        """Connect to the dualsense ps5 controller"""

        print("Establishing connection to dualsense controller...")
        self.ds_api.init()

    # def update(self):
    #     """
    #     TODO: Update step in main application loop
    #     """
    #     pass
    #     if self.ds_api.state.cross: # does this accurately tell if the button is pressed?
    #         self.state.cross_state_pressed = True

    def serialize(self):
        """
        Serialize ps controller state.
        """

        ret = {}
        for attr, value in self.state.__dict__.items():
            # print(attr, value)
            ret[attr] = value
        print(ret)
        return ret

    def close(self):
        """
        Close the connection to the controller
        """

        print("Terminating connection to the ps5 controller")
        self.ds_api.close()

    def triangle_event(self, state):
        self.state.button_triangle_pressed = state

    def cross_event(self, state):
        self.state.button_cross_pressed = state

    def circle_event(self, state):
        self.state.button_circle_pressed = state

    def square_event(self, state):
        self.state.button_square_pressed = state

    def registerCallbacks(self):
        self.ds_api.cross_pressed += self.cross_event  # function pointer
        self.ds_api.triangle_pressed += self.triangle_event
        self.ds_api.circle_pressed += self.circle_event
        self.ds_api.square_pressed += self.square_event

        # Et cetera ........
        # do the rest here
