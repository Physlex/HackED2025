from pydualsense import pydualsense

from dualsense import cross_press

ds = pydualsense()
print("Dualsense intialized")
ds.init()
ds.cross_pressed += cross_press

while not ds.state.R1:
    pass

ds.close() # Close the connection after processing
