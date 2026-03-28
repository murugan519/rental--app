require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

// SOCKET.IO
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("join_booking", (bookingId) => {
    socket.join(bookingId);
  });

  socket.on("update_location", (data) => {
    io.to(data.bookingId).emit("live_location", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

// ROUTES
app.use("/api/auth", require("./routes/auth"));
app.use("/api/machines", require("./routes/machines"));
app.use("/api/bookings", require("./routes/bookings"));
app.use("/api/partner", require("./routes/partner"));

// TEST
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

// START SERVER
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});