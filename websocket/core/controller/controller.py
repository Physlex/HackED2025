from pydualsense import pydualsense


class Controller(object):
    def __init__(self):
        self.ds_api = pydualsense()
        pass

    def connect(self):
        """Connect to the dualsense ps5 controller"""

        print("Establishing connection to dualsense controller...")
        self.ds_api.init()

        pass

    def update(self):
        """
        TODO: Update step in main application loop
        """
        pass

    def deserialize(self):
        """
        TODO: Deserialize ps controller state
        """
        return {}

    def close(self):
        """
        Close the connection to the controller
        """

        print("Terminating connection to the ps5 controller")
        self.ds_api.close()

        pass
