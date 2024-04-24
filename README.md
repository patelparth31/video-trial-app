# vidme
Vidme is group video calling web-app which makes the use Agora Web SDK to let the users create a room and invite their friends to it to form a video room.
, used Django as backend. 


## Functionalities
1. User Authentication - Login, Signup and Logout
2. Video Calling 
3. Muting Video and Audio according to the likes of user
4. Supports Multiple Users

## TechStacks
1. Django
2. Javascript
3. HTML
4. CSS
5. Agora SDK

## User Interface
#### Lobby Screen
![image](https://user-images.githubusercontent.com/55317884/204858204-86479826-60ce-4c92-97bb-8828ea33031d.png)

#### Login Screen
![image](https://user-images.githubusercontent.com/55317884/204858357-4828d335-1ec1-4e81-9f00-4c2125fc2f26.png)

#### Signup Screen
![image](https://user-images.githubusercontent.com/55317884/204858432-d2f4e570-e4fa-4e9c-8bcc-d7944917c0af.png)

#### Room Screen
![image](https://user-images.githubusercontent.com/55317884/204858768-6c0c1361-d396-46d8-891c-15876c1d40bf.png)



## How to use this source code
### 1 - Clone repo
```
git clone https://github.com/ammuubisht/vidme
```
### 2 - Install requirements
```
cd vidme
pip install -r requirements.txt
```
### 3 - Update Agora credentals

In order to use this project you will need to replace the agora credentials in views.py and streams.js.

Create an account at https://www.agora.io/ and create an app. Once you create your app, you will want to copy the appid & appCertificate to update views.py and streams.js.

> views.py
```
def getToken(request):
    appId = "YOUR APP ID"
    appCertificate = "YOUR APPS CERTIFICATE"
    ......
```
> streams.js
```
....
const APP_ID = 'YOUR APP ID'
....
```
### 4 - Start server
```
python manage.py runserver
```

