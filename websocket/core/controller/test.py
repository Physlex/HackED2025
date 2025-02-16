from pydualsense import pydualsense

from dualsense import cross_press

ds = pydualsense()
ds.init()
ds.cross_pressed += cross_press
ds.close() # Close the connection after processing
