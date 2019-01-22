FROM rust:1.32.0

ENV DSSIM_VERSION=2.9.7

WORKDIR /usr/src
RUN git clone -b $DSSIM_VERSION --single-branch --depth 1 https://github.com/pornel/dssim.git \
    && cargo build --release --manifest-path /usr/src/dssim/Cargo.toml

ENTRYPOINT [ "/usr/src/dssim/target/release/dssim" ]
