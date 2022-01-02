import sys
import os
from PIL import Image
import numpy as np

dataset_folder = sys.argv[1]
np_file = sys.argv[2]

np.save(np_file, np.array([np.array(Image.open(dataset_folder + d)) for d in os.listdir(dataset_folder)]))