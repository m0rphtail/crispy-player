#!/usr/bin/env python
# coding: utf-8

# In[1]:


import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf
import random
import os


# In[2]:


print("TensorFlow version:", tf.__version__)

gpus = tf.config.experimental.list_physical_devices('GPU')
print("Detected GPUs:", len(gpus))
for gpu in gpus:
    tf.config.experimental.set_memory_growth(gpu, True)


# In[3]:


from tensorflow.keras.initializers import RandomNormal
import tensorflow.keras.backend as K

#Modified depth_to_space shuffle order for easier shader generation
class DepthToSpace2(tf.keras.layers.Layer):
    def __init__(self, input_depth, **kwargs):
        super(DepthToSpace2, self).__init__(**kwargs)
        self.input_depth = input_depth

    def build(self, input_shape):
        super(DepthToSpace2, self).build(input_shape)

    def call(self, x):
        x = tf.split(x, (self.input_depth // 4), axis=-1)
        return tf.concat([tf.nn.depth_to_space(xx, 2) for xx in x], axis=-1)

#SR model that does not change image size
def SR1Model(input_texture="MAIN", input_depth=3, highway_depth=4, block_depth=4, init='he_normal', init_last = RandomNormal(mean=0.0, stddev=0.001)):

    input_shape = [None, None, input_depth]
    #Add ".MAIN" in layer name as flag for shader generation, this makes the input act as the MAIN texture
    input_lr = tf.keras.layers.Input(shape=input_shape, name="input." + input_texture)
    
    depth_list = []
    
    x = input_lr
    for i in range(block_depth):
        x = tf.keras.layers.Conv2D(highway_depth, (3, 3), padding='same', kernel_initializer=init)(x)
        x = tf.nn.crelu(x)
        depth_list.append(x)

    x = tf.keras.layers.Concatenate(axis=-1)(depth_list)
    
    #Add "lastresid" in layer name as flag for shader generation, this allows the shader to combine the convolution with the residual add as one layer for faster performance
    #Add ".MAIN" in layer name to make the layer save to the MAIN texture
    x = tf.keras.layers.Conv2D(input_depth, (1, 1), padding='same', kernel_initializer=init_last, name="conv2d_lastresid." + input_texture)(x)
    
    #Add ".ignore" in layer name as flag for shader generation, this will ignore the layer, as the residual will be added by the previous "lastresid" layer
    x = tf.keras.layers.Add(name="add.ignore." + input_texture)([x, input_lr])

    model = tf.keras.models.Model(input_lr, x)

    return model

#SR model that doubles image size
def SR2Model(input_texture="MAIN", input_depth=3, highway_depth=4, block_depth=4, init='he_normal', init_last = RandomNormal(mean=0.0, stddev=0.001)):

    input_shape = [None, None, input_depth]
    #Add ".MAIN" in layer name as flag for shader generation, this makes the input act as the MAIN texture
    input_lr = tf.keras.layers.Input(shape=input_shape, name="input." + input_texture)
    input_lr2 = tf.keras.layers.UpSampling2D(size=(2, 2), interpolation='bilinear')(input_lr)
    
    depth_list = []
    
    x = input_lr
    for i in range(block_depth):
        x = tf.keras.layers.Conv2D(highway_depth, (3, 3), padding='same', kernel_initializer=init)(x)
        x = tf.nn.crelu(x)
        depth_list.append(x)

    x = tf.keras.layers.Concatenate(axis=-1)(depth_list)
    x = tf.keras.layers.Conv2D(4*input_depth, (1, 1), padding='same', kernel_initializer=init_last)(x)
    
    #Add "lastresid" in layer name as flag for shader generation, this allows the shader to combine the convolution with the residual add as one layer for faster performance
    #Add ".MAIN" in layer name to make the layer save to the MAIN texture
    x = DepthToSpace2(4*input_depth, name="depth_to_space2_lastresid." + input_texture)(x)
    
    #Add ".ignore" in layer name as flag for shader generation, this will ignore the layer, as the residual will be added by the previous "lastresid" layer
    x = tf.keras.layers.Add(name="add.ignore." + input_texture)([x, input_lr2])

    model = tf.keras.models.Model(input_lr, x)

    return model


# In[4]:


K.reset_uids()
model = SR2Model(input_texture="MAIN", input_depth=3, highway_depth=4, block_depth=7)
model.summary(line_length=150)
model.load_weights("model-checkpoint.h5")


# In[5]:


from shaderutils import gen_shader
gen_shader(model, hook="MAIN", file="Upscale_Shader.glsl", desc="Upscale", when="OUTPUT.w MAIN.w / 1.200 > OUTPUT.h MAIN.h / 1.200 > *")

