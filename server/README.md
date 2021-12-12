1. First start mongo with : `sudo systemctl start mongod`
2. Create a .env file with : `echo "DB = \"mongodb://localhost/image-upload\""`
3. Install dependancies with : `npm i`
3. Start server with : `node index.js`


POST file<br>
URL : localhost:8080/file/upload?file<br>
form-data : "file" as key and video file as value<br>
returns   : a link to the file eg(http://localhost:8080/file/gg.mp4)<br>


GET file<br>
URL : http://localhost:8080/file/gg.mp4<br>
returns : video <br>
