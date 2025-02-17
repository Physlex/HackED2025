# Hacked2025 Submission

This is the team pointers-in-python submission for hacked 2025.

## How to Run:

### Connect your PS5 controller through BlueTooth

### Setup the websocket server:
```cd websocket```

```pip install -r requirements.txt```

Then run the `server.py` file (using windows):

`python3 server.py`

### Setup the Django Virtual Environment:

Starting from the root directory: 

``` cd src-django```

then run - using linux & bash:

``` python3 -m venv venv```

```source ./venv/bin/activate```

```pip install -r requirements.txt```

``make db``

``make run``


### NPM Setup

After you set up the Django backend, you can go back to the root directory, then

```cd src-vite```

From there you can 

``npm install``

`` npm run build``

From there you can connect to 

http://127.0.0.1:8000/


