# Setup
This is meant for use on a raspberry pi with a DHT11 sensor.

## Before you begin
An AWS endpoint and dynamoDB need to be setup on AWS to receive data input.

Install git:
```
sudo apt-get install git-core
```

Install Adafruit DHT11 Library:
```
git clone https://github.com/adafruit/Adafruit_Python_DHT.git
```

Change directory to Adafruit Library:
```
cd Adafruit_Python_DHT
```

Install some extra stuff:
```
sudo apt-get install build-essential python-dev
```

Run Library setup:
```
sudo python setup.py install
```

Clone this repo:
```
git clone https://github.com/lernerbot/humidityToCloud.git
```

Change directory to humidity folder:
```
cd humidityToCloud
```

Run the humidity logger:
```
python humidity.py
```
