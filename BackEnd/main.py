### Import all libraries that needed ###
import time
from flask_cors import CORS
from config import *
from adafruit_servokit import ServoKit
from flask import Flask, render_template, jsonify, request
from flask_socketio import SocketIO
from threading import Thread
import cv2
import base64

# Initialize Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
# Allow all origins with Flask-CORS
CORS(app)
app.app_context().push()
# Initialize Flask-SocketIO
socketio = SocketIO(app, cors_allowed_origins='*')

# --------  Start of Streaming Class -----------#

# Live streaming thread class
class LiveStreaming(Thread):
    def __init__(self, socket):
        Thread.__init__(self)
        self.net = socket
        self.connectedIs = False
        self.cam = cv2.VideoCapture(0)
        self.frame_width = 640  # Set your desired frame width
        self.frame_height = 480  # Set your desired frame height
        self.cam.set(cv2.CAP_PROP_FRAME_WIDTH, self.frame_width)
        self.cam.set(cv2.CAP_PROP_FRAME_HEIGHT, self.frame_height)

    def run(self):
        while True:
            if self.connectedIs:
                ret, frame = self.cam.read()
                if ret:
                    encoded_frame = self.encode_frame(frame)
                    self.stream_frame(encoded_frame)
                time.sleep(0.03)

    def encode_frame(self, frame):
        # Encode frame as JPEG
        retval, buffer = cv2.imencode('.jpeg', frame)
        if retval:
            # Convert buffer to base64 string
            base64_str = base64.b64encode(buffer).decode('utf-8')
            return base64_str
        return None

    def stream_frame(self, encoded_frame):
        # Stream encoded frame to frontend via 'ControllerData' event
        if encoded_frame is not None:
            self.net.emit('ControllerData', {'cam': encoded_frame})

    def stop(self):
        # Release the video capture on stop
        self.cam.release()

# --------  End of Streaming Class -----------#


# --------  Start of Motor Class -----------#
class Servo(Thread):
    def __init__(self):
        Thread.__init__(self)
        self.moveStraightIs = False
        self.moveLeftIs = False
        self.moveRightIs = False
        self.moveBackwardIs = False
        self.moveStopIs = False
        pass # End of Servo class constructor
    def moveStraightEndToStart(self):
        try:
            kit = ServoKit(channels=16) # create object for HAT kit
            #### Rotate End to Start ####
            kit.servo[0].angle = End_Angle_0
            time.sleep(1)
            kit.servo[0].angle = Start_Angle_0
            time.sleep(1)
            kit.servo[1].angle = End_Angle_1
            time.sleep(1)
            kit.servo[1].angle = Start_Angle_1
            time.sleep(1)
        except  Exception as e:
            print(f"Error in I2C communication: {e}")
        pass # End of moveStraight function
    
    def moveStraightStartToEnd(self):
        try:
            kit = ServoKit(channels=16) # create object for HAT kit
            #### Move Start to End ####
            kit.servo[0].angle = Start_Angle_0
            time.sleep(1)
            kit.servo[0].angle = End_Angle_0
            time.sleep(1)
            kit.servo[1].angle = Start_Angle_1
            time.sleep(1)
            kit.servo[1].angle = End_Angle_1
            time.sleep(1)
        except  Exception as e:
            print(f"Error in I2C communication: {e}")
        pass # End of moveStraight function

    def moveLeftEndToStart(self):
        try:
            kit = ServoKit(channels=16) # create object for HAT kit
            #### Rotate End to Start ####
            kit.servo[2].angle = End_Angle_2
            time.sleep(1)
            kit.servo[2].angle = Start_Angle_2
            time.sleep(1)
            kit.servo[3].angle = End_Angle_3
            time.sleep(1)
            kit.servo[3].angle = Start_Angle_3
            time.sleep(1)
        except Exception as e:
            print(f"Error in I2C communication: {e}")
        pass # End of moveLeftt function
    
    def moveLeftStartToEnd(self):
        try:
            kit = ServoKit(channels=16) # create object for HAT kit
            #### Rotate Start to End ####
            kit.servo[2].angle = Start_Angle_2
            time.sleep(1)
            kit.servo[2].angle = End_Angle_2
            time.sleep(1)
            kit.servo[3].angle = Start_Angle_3
            time.sleep(1)
            kit.servo[3].angle = End_Angle_3
            time.sleep(1)
        except Exception as e:
            print(f"Error in I2C communication: {e}")
        pass # End of moveLeftt function
    def moveRightEndToStart(self):
        try:
            kit = ServoKit(channels=16) # create object for HAT kit
            #### Rotate End to Start ####
            kit.servo[4].angle = End_Angle_4
            time.sleep(1)
            kit.servo[4].angle = Start_Angle_4
            time.sleep(1)
            kit.servo[5].angle = End_Angle_5
            time.sleep(1)
            kit.servo[5].angle = Start_Angle_5
            time.sleep(1)
        except Exception as e:
            print(f"Error in I2C communication: {e}")
        pass # End of moveRight function
    def moveRightStartToEnd(self):
        try:
            kit = ServoKit(channels=16) # create object for HAT kit
            #### Rotate Start to End ####
            kit.servo[4].angle = Start_Angle_4
            time.sleep(1)
            kit.servo[4].angle = End_Angle_4
            time.sleep(1)
            kit.servo[5].angle = Start_Angle_5
            time.sleep(1)
            kit.servo[5].angle = End_Angle_5
            time.sleep(1)
        except Exception as e:
            print(f"Error in I2C communication: {e}")
        pass # End of moveRight function
    def moveBackwardEndToStart(self):
        try:
            kit = ServoKit(channels=16) # create object for HAT kit
            #### Rotate End to Start ####
            kit.servo[6].angle = End_Angle_6
            time.sleep(1)
            kit.servo[6].angle = Start_Angle_6
            time.sleep(1)
            kit.servo[7].angle = End_Angle_7
            time.sleep(1)
            kit.servo[7].angle = Start_Angle_7
            time.sleep(1)
            kit.servo[8].angle = End_Angle_8
            time.sleep(1)
            kit.servo[8].angle = Start_Angle_8
            time.sleep(1)
            kit.servo[9].angle = End_Angle_9
            time.sleep(1)
            kit.servo[9].angle = Start_Angle_9
            time.sleep(1)
            kit.servo[10].angle = End_Angle_10
            time.sleep(1)
            kit.servo[10].angle = Start_Angle_10
            time.sleep(1)
            kit.servo[11].angle = End_Angle_11
            time.sleep(1)
            kit.servo[11].angle = Start_Angle_11
            time.sleep(1)
        except Exception as e:
            print(f"Error in I2C communication: {e}")
        pass # End of moveBackward function
    def moveBackwardStartToEnd(self):
        try:
            kit = ServoKit(channels=16) # create object for HAT kit
            #### Rotate Start to End ####
            kit.servo[6].angle = Start_Angle_6
            time.sleep(1)
            kit.servo[6].angle = End_Angle_6
            time.sleep(1)
            kit.servo[7].angle = Start_Angle_7
            time.sleep(1)
            kit.servo[7].angle = End_Angle_7
            time.sleep(1)
            kit.servo[8].angle = Start_Angle_8
            time.sleep(1)
            kit.servo[8].angle = End_Angle_8
            time.sleep(1)
            kit.servo[9].angle = Start_Angle_9
            time.sleep(1)
            kit.servo[9].angle = End_Angle_9
            time.sleep(1)
            kit.servo[10].angle = Start_Angle_10
            time.sleep(1)
            kit.servo[10].angle = End_Angle_10
            time.sleep(1)
            kit.servo[11].angle = Start_Angle_11
            time.sleep(1)
            kit.servo[11].angle = End_Angle_11
            time.sleep(1)
        except Exception as e:
            print(f"Error in I2C communication: {e}")
        pass # End of moveBackward function
    def stop_(self):
        self.moveStraightIs = False
        self.moveLeftIs = False
        self.moveRightIs = False
        self.moveBackwardIs = False
        self.moveStopIs = True
        pass # End of stop_ function
    def checkPassword(self,password):
        myPassword = ""
        with open('password.txt','r') as file:
            myPassword = file.readline()
        if(password == myPassword):
            return True
        else:
            return False
        # End of checkPassword fuunction
    def run(self):
        while(True):
            if(self.moveStraightIs):
                print("Moving Staright End to Start")
                self.moveStraightEndToStart()
                if(self.moveStraightIs):
                    print("Moving Staright Start to End")
                    self.moveStraightStartToEnd()
                else:
                    pass
                pass
            elif(self.moveLeftIs):
                print("Moving Left End to Start")
                self.moveLeftEndToStart()
                if(self.moveLeftIs):
                    print("Moving Left Start to End")
                    self.moveLeftStartToEnd()
                else:
                    pass
                pass
            elif(self.moveRightIs):
                print("Moving Right End to Start")
                self.moveRightEndToStart()
                if(self.moveRightIs):
                    print("Moving Right Start to End")
                    self.moveRightStartToEnd()
                else:
                    pass
                pass
            elif(self.moveBackwardIs):
                print("Moving Backward End to Start")
                self.moveBackwardEndToStart()
                if(self.moveBackwardIs):
                    print("Moving Backward Start to End")
                    self.moveBackwardStartToEnd()
                else:
                    pass
                pass
            elif(self.moveStopIs):
                print("Moving Stop")
                self.moveStopIs = False
                pass
            else:
                pass
        pass # End of run function
# --------  End of Motor Class -----------#

# -------- Start of Streaming API's -----------#
# Initialize the live streaming thread
streaming_thread = LiveStreaming(socketio)

# SocketIO connect event
@socketio.on("connect")
def test_connect():
    global streaming_thread
    print("Client connected")
    if not streaming_thread.is_alive():
        streaming_thread.start()
    streaming_thread.connectedIs = True

# SocketIO disconnect event
@socketio.on('disconnect')
def test_disconnect():
    global streaming_thread
    print('Client disconnected')
    streaming_thread.connectedIs = False

# -------- End of  Streaming API's -----------#
    
# --------  Start of Motor control API's -----------#
    
servo = Servo()
servo.start()

@app.route("/login", methods=['POST'])
def login():
    response = {"Result" : "Request Error"}
    password = "Request Error"
    if request.method == 'POST':
        try:
            password = request.get_json()["Password"]
            if(servo.checkPassword(password)):
                response["Result"] = True
            else:
                response["Result"] = False
        except Exception as e:
            print(f"Error : {e} Object not found")
    print(f"Received Password : {password}")
    print(response)
    return jsonify(response)
@app.route("/move", methods=['POST'])
def move():
    straightCommand = "Straight"
    leftCommand = "Left"
    rightCommand = "Right"
    backwardCommand = "Backward"
    stopCommand = "Stop"
    response = {"Result" : None}
    Command = "Request Error"
    if request.method == 'POST':
        try:
            Command = request.get_json()["Command"]
            if(Command == straightCommand):
                servo.moveStraightIs = True
                response["Result"] = "Straight Command Executed"
                pass
            elif(Command == leftCommand):
                servo.moveLeftIs = True
                response["Result"] = "Left Command Executed"
                pass
            elif(Command == rightCommand):
                servo.moveRightIs = True
                response["Result"] = "Right Command Executed"
                pass
            elif(Command ==backwardCommand):
                servo.moveBackwardIs = True
                response["Result"] = "Backward Command Executed"
                pass
            else:
                response["Result"] = "Wrong Command"
                pass
        except Exception as e:
            print(f"Error : {e} Object not found")
    print(f"Received Command : {Command}")
    print(response)
    return jsonify(response)

@app.route("/stop", methods=['POST'])
def stop():
    stopCommand = "Stop"
    response = {"Result" : "Request Error"}
    Command = "Request Error"
    if request.method == 'POST':
        try:
            Command = request.get_json()["Command"]
            if(Command == stopCommand):
                servo.stop_()
                response["Result"] = "Stop Command Executed"
                pass
            else:
                response["Result"] = "Wrong Command"
                pass
        except Exception as e:
            print(f"Error : {e} Object not found")
        print(f"Received Command : {Command}")
    print(response)
    return jsonify(response)

# --------  End of Motor control API's -----------#


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True, use_reloader=False)


