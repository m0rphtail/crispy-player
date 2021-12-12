import os
from cv2 import cv2
import numpy as np
import matplotlib.pyplot as plt

path='Dataset_1024/'

training_data=[]
for img in os.listdir(path):
    pic=cv2.imread(os.path.join(path,img))
    pic = cv2.cvtColor(pic,cv2.COLOR_BGR2RGB)
    pic = cv2.resize(pic,(80,80))
    training_data.append([pic])

np.save(os.path.join(path,'features'),np.array(training_data))

