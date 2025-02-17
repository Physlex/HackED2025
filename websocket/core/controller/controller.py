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

        self.joystick_left_x = 0
        self.joystick_left_y = 0
        self.joystick_right_x = 0
        self.joystick_right_y = 0


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
        TODO: serialize ps controller state
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



    # ================= Callback function spam down here ======================

    def triangle_event(self, state):
        self.state.button_triangle_pressed = state

    def cross_event(self, state):
        self.state.button_cross_pressed = state
    
    def circle_event(self, state):
        self.state.button_circle_pressed = state
    
    def square_event(self, state):
        self.state.button_square_pressed = state
    
    def trigger_L1_event(self, state):
        self.state.trigger_L1_pressed = state
    
    def trigger_L2_event(self, state):
        self.state.trigger_L2_pressed = state
    
    def trigger_R1_event(self, state):
        self.state.trigger_R1_pressed = state
    
    def trigger_R2_event(self, state):
        self.state.trigger_R2_pressed = state
    
    def down_dpad_event(self, state):
        self.state.down_dpad_pressed = state
    
    def up_dpad_event(self, state):
        self.state.up_dpad_pressed = state
    
    def left_dpad_event(self, state):
        self.state.left_dpad_pressed = state
    
    def right_dpad_event(self, state):
        self.state.right_dpad_pressed = state

    def left_joystick_event(self, stateX, stateY):
        # print(stateX, stateY)
        self.state.joystick_left_x = stateX
        self.state.joystick_left_y = stateY
    
    def right_joystick_event(self, stateX, stateY):
        # print(stateX, stateY)
        self.state.joystick_right_x = stateX
        self.state.joystick_right_y = stateY

    


    def registerCallbacks(self):
        self.ds_api.cross_pressed += self.cross_event # function pointer
        self.ds_api.triangle_pressed += self.triangle_event # The += is operator overloading btw lol
        self.ds_api.circle_pressed += self.circle_event
        self.ds_api.square_pressed += self.square_event

        self.ds_api.l1_changed += self.trigger_L1_event
        self.ds_api.l2_changed += self.trigger_L2_event
        self.ds_api.r1_changed += self.trigger_R1_event
        self.ds_api.r2_changed += self.trigger_R2_event

        self.ds_api.dpad_up += self.up_dpad_event
        self.ds_api.dpad_down += self.down_dpad_event
        self.ds_api.dpad_left += self.left_dpad_event
        self.ds_api.dpad_right += self.right_dpad_event

        self.ds_api.left_joystick_changed += self.left_joystick_event
        self.ds_api.right_joystick_changed += self.right_joystick_event

        # Et cetera ........
        # do the rest here

