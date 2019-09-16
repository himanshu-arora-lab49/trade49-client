Set up JSON Server

Step 1: To set up the JSON Server run the following command:
npm install -g json-server

Step 2: Create a db.json file with some data
{
 "posts": [
 { "id": 1, "title": "learn json-server", "author": "Mrinmay Mukherjee" }
 ],
 "comments": [
 { "id": 1, "body": "it's pretty awesome", "postId": 1 }
 ],
 "profile": { "name": "Mrinmay Mukherjee" }
}
 
 
Step 3: Start JSON Server
json-server --watch db.json --port 8000
