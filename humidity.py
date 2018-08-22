#!/usr/bin/python
import sys
import time
import datetime
import Adafruit_DHT
import requests
import json

sensor = 1
runOnce = True
while runOnce:
    runOnce = False
    humidity, temperature = Adafruit_DHT.read_retry(11, 4)
    temperature = (temperature * 1.8) + 32
    dt = datetime.datetime.now().strftime("%A %d %B %Y %I:%M%p")
    print dt, 'Temp: {0:0.1f} F  Humidity: {1:0.1f} %'.format(temperature, humidity)
    url =  'https://4xdxane8ma.execute-api.us-west-2.amazonaws.com/Production/sensor'
    payload =   {'sensor' : sensor, 'date' : dt, 'temperature' : temperature, 'humidity' : humidity}  
    r = requests.post(url, data=json.dumps(payload))
    print r
    print r.text 
    print r.status_code

    #outtext = dt + "," + str(temperature) + "," + str(humidity) + "\n"
    #with open("humidity.log", "a") as myfile:
    #    myfile.write(outtext)
    time.sleep(1)
