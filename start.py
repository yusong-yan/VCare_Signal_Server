from threading import Thread
import subprocess
import time

def runServer():
  print('Starting server...\n')
  output = subprocess.run(["node", 'index.js'])
  print('Done running server...')

server = Thread(target=runServer) #you can create as many threads as you need
server.start()

#other code goes here
for x in range(0,15):
    print(x)
    time.sleep(1)