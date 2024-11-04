## A high level view of the server. 
#### Three main sections
- Registration
- Login
- upgrade

#### Registration
User registration will _check existence of the user_ or _add user to database(in this case an array of objects)_ 

#### Login
_Verify_ user. _Authenticate_ using __JWT__

#### Upgrade
This is an important step. It establishes a socket connection.<br>
In this step we switch from __http__ to __ws__ protocol.

`Note`: _This can be handled by just sending a Websocket connection request and connection listener will listen to it and the handshake is established. But we also want to verify the user with __JWT__ verify. For which we need the username and password. This is the reason we need to __interrupt__ the incoming request. This request will have __upgrade__ header. We we catch this __'upgrade'__ event and proceed further_

Upon verifying the user we can __emit__ a _'connection'_ event and listen for it to <hr />

# A high level view of the Client

_Client does simple authentication. If the token is correct or present it gives acess to the main component. Simple_

__CollaborativeEditor__ is the main component

