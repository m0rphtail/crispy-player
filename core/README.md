# Crispy Player Core

contains the code for the main application

## pre-requisites 
#### Arch Linux and derivatives:
```
pacman -S mpv
```

#### On Ubuntu and derivatives:
```
apt install mpv libmpv-dev
```

## compile:
```
gcc -o crispy crispy.c `pkg-config --libs --cflags mpv`

```

## run:
```
./cripsy </path/to/file> <mode[1 = for highend gpu]>
```
