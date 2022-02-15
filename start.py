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
print("Main Thread Is Here!")