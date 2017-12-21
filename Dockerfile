FROM rust:1.22.1

WORKDIR /usr/src
RUN svn export https://github.com/pornel/dssim/tags/2.9.4 dssim \
    && cargo build --release --manifest-path /usr/src/dssim/Cargo.toml

ENTRYPOINT [ "/usr/src/dssim/target/release/dssim" ]
