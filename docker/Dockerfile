FROM archlinux

RUN pacman -Syyu --noconfirm && pacman -S rustup mpv wget unzip git base-devel --noconfirm
RUN rustup default stable


# Precompiled binary
# ------------------------------------------
# RUN mkdir /crispy-player
# WORKDIR /crispy-player
# ENTRYPOINT [ "/crispy-player/anime4k" ]


# compile on docker
# ------------------------------------------
COPY code /crispy-player
WORKDIR /crispy-player
RUN cargo build --release
ENTRYPOINT [ "/crispy-player/target/release/crispy-player" ]
