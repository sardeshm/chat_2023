const { stringify } = require("querystring");

const app = require("express")();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: { origin: "*" },
});

var userRoomArray = new Array();
const port = process.env.PORT || 3000;

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("join", (data) => {
    console.log("1234: ", data);

    const filterUserRoomArray = userRoomArray.filter(
      (data) => data.userName === data.user && data.userRoom === data.room
    );
    console.log("filterUserRoomArray : ", filterUserRoomArray);
    if (!filterUserRoomArray.length > 0) {
      userRoomArray.push({ userName: data.user, roomName: data.room });
    }

    let filterList = userRoomArray
      .filter((userRoom) => {
        console.log("filterd data: ", userRoom);
        return userRoom.roomName === data.room;
      })
      .map((u) => u.userName);
    console.log("filterlist: ", filterList);
    socket.join(data.room);
    console.log(data.user + "joined the room : " + data.room);

    io.to(data.room).emit("new user joined", {
      user: data.user,
      room: data.room,
      message: "has joined this room",
      joinedUserList: filterList,
    });
  });

  socket.on("leave", (data) => {
    console.log(data.user + "left the room  : " + data.room);
    io.to(data.room).emit("left room", {
      user: data.user,
      message: "has left this room",
    });
    socket.leave(data.room);
  });

  socket.on("message", (data) => {
    console.log("This message should display :", data);
    io.in(data.room).emit("new message", {
      user: data.user,
      message: data.message,
    });
  });
  /**socket.on("userRoomArray", (data) => {
    io.on("connection", (socket) => {
      socket.emit("hello", "world");
    });
  });**/

  io.emit("userRoomArray", userRoomArray);
});

app.get("/getUserRooms", function (req, res) {
  res.status(200).json(userRoomArray);
});

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});

httpServer.listen(port, () => console.log(`listening on port ${port}`));
