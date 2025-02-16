"""
This class implements a mini-abstraction layer over the dualshock ps4 controller
"""

from pydualsense import pydualsense, TriggerModes

def cross_press(state):
    print(state)
