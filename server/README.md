1. First start mongo with : `sudo systemctl start mongod`<br>
2. create a .env file with : `echo "DB = \"mongodb://localhost/image-upload\""`<br>
3. start server with : `node index.js`


POST file<br>
URL : localhost:8080/file/upload?file<br>
form-data : "file" as key and video file as value<br>
returns   : a link to the file eg(http://localhost:8080/file/gg.mp4)<br>


GET file<br>
URL : http://localhost:8080/file/gg.mp4<br>
returns : video <br>
