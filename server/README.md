First start mongo with : sudo systemctl start mongod

start server with : node index.js

create a .env file with : echo "DB = \"mongodb://localhost/image-upload\""

POST file
URL : localhost:8080/file/upload?file
form-data : "file" as key and video file as value
returns   : a link to the file eg(http://localhost:8080/file/gg.mp4)

GET file
URL : http://localhost:8080/file/gg.mp4
returns : video 
