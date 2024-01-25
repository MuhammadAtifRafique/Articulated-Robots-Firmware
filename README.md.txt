Libs Installation:-
    1.	Nodejs and npm
    2.	Apache2
    3.	OpenCV
    4.	Flask Socketio
    5.	HAT board Library
    6.	Flask and Cores

    ❖	Nodejs and npm:-
        1.	Run this command "bash <(curl -sL https://raw.githubusercontent.com/node-red/linux-installers/master/deb/update-nodejs-and-nodered)" from the link.
        2.	Are you really want to do this ? [y/N] ? then command “y”
        3.	Would you like to install the Pi-specific nodes ? [y/N] ? then command “y” then wait until installation.
        4.	Would you like to customize the settings now [y/N] ? then command “y”
        5.	Settings file then Enter
        6.	Do you want to set up security? then command “NO”
        7.	Enter a name of your flows file then Enter
        8.	Provide a passphrase to encrypt your credentials file - Then Enter
        9.	Select a theme for the editor(And more text also written after that) then select Default
        10.	Select the text editor component to use the Node-RED Editor then select monaco default
        11.	Allow function nodes to load external modules? (FunctionExternalModules) then select Yes
        12.	We can check "npm -v" then show the version of npm.
        13.	We can check "nodejs -v" then show the version of node js.
        14.	Congratulation we have install Node-Red include nodejs and npm.

    ❖	Apache2 Installation:-
        1.	To update installed packages command "sudo apt update"
        2.	To install the apache server command “sudo apt install apache2” 

    ❖	Flask SocketIO Install:-
        1.	pip3 install Flask-SocketIO


    ❖	Install opencv in Raspberry pi:-
        1.	Run this command in the terminal “sudo apt-get install python3-opencv“ and wait until installation is complete.
        2.	For enable the camera run this command in the terminal “sudo raspi-config” 
        3.	Then click on “Interface Options” .
        4.	After that click on “Legacy camera” then select yes to enable the camera and at the end reboot raspberry pi to save settings.

    ❖	Install Flask and Cores:-
        1.	To install Flask command “pip install Flask” from link
        2.	To install Flask-Cors command “pip install Flask-Cors” from link

    ❖	HAT board Library:-
        1.	To install library for HAT to control the servo motor’s command “pip install adafruit-circuitpython-servokit” from link


Setup Instructions:-
1.	Apache2 setup and run:-
    1.1	Open “pi-servo-front-end\src\fetch.js” then change baseUrl IP and socketIoBaseUrl IP with your raspberry pi IP (Check your IP with command “hostname -I”)
    1.2	Go to “pi-servo-front-end” directory then open the command prompt in this directory.
    1.3	Installs dependencies of app so command “npm install”
    1.4	To create the build file command “npm run build” then the build folder will be created at the end.

    1.5	Command "sudo service apache2 start" to start apache server
    1.6	Go to directory where you need to put your html file command "cd /var/www/html"
    1.7	Now copy your html and css file into that directory and then restart apache2 server with this command "sudo service apache2 restart" but its will give you access denied error so to access use this command “sudo chown -R $USER:$USER /var/www” then now you can copy paste files that are inside the this directory “Milestone_2_Complete\pi-servo-front-end\build”  and remove old files from this “/var/www/html” directory.
    1.8	Then check your website with your raspberry pi IP address (Like : 192.168.1.45) you can check your raspberry pi IP with this command “hostname -I” for local network so now you can see your website that is hosted in raspberry pi using apache2.

2.	Backend server run:-
    2.1	First make a connection of your HAT board with raspberry pi carefully according to HAT board documentation.
    2.2	After that plugin power jack to raspberry pi and HAT board then shut on power supply.
    2.3	Now got to “BackEnd” directory and run this command “python main.py”
    2.4	After this your backend server is running now.
