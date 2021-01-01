# Servey

Servey is a simple http static file server made with deno and typescript

## Installation

```bash
deno install --allow-net --allow-read -n servey https://deno.land/x/servey/mod.ts
```

## Usage

This will run a basic file server in the cwd on `localhost:5000/<file-path>`:

```bash
servey
```

options:

```
-h, --help: display a help message like this
-D, --download: makes files downloadable
-p, --port <port>: runs the server on <port> instead of 3000
```
