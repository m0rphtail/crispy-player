# CNN Model

## Requirements:

### Local machine
- `cuda`
- `cudnn`

### Python
- `matplotlib`
- `tensorflow`

```
pip install -r requirements.txt
```

## Dataset:
Download and extract the Dataset:
```
wget https://github.com/bloc97/SYNLA-Plus/releases/download/v1.0/Dataset_Color_4096.tar
wget https://github.com/bloc97/SYNLA-Plus/releases/download/v1.0/Dataset_Color_1024.tar
```
```
7z x Dataset_Color_4096.tar
7z x Dataset_Color_1024.tar
```

Generate the npy_files:
```
python npy_generator.py Dataset_4096/ Dataset_4096.npy
python npy_generator.py Dataset_1024/ Dataset_1024.npy
```

One command to do it all:
```
wget https://github.com/bloc97/SYNLA-Plus/releases/download/v1.0/Dataset_Color_4096.tar && \
wget https://github.com/bloc97/SYNLA-Plus/releases/download/v1.0/Dataset_Color_1024.tar && \
7z x Dataset_Color_4096.tar && \
7z x Dataset_Color_1024.tar && \
python npy_generator.py Dataset_4096/ Dataset_4096.npy && \
python npy_generator.py Dataset_1024/ Dataset_1024.npy && \
rm -rf Dataset_4096 Dataset_1024 *.tar
```

## Training:
Run the `Train_model.ipynb` file

## Generating shaders:
//TODO
