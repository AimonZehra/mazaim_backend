
const { UploadImageRoutes,AdminAuthRoutes, ProductRoutes, BannerRoutes, ContactRoutes,
  ShippingRoutes,
  CheckoutRoutes,
  ReviewsRoutes} = require('./src/routes');
const { sequelize } = require('./models');
require("dotenv").config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
const session = require('express-session');
const cors = require('cors');
app.use(cors({origin: true, credentials: true}));
const fileUpload = require('express-fileupload');
const http = require('http');
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use("/public", express.static("public"));
app.use(fileUpload());

app.use(session({
    secret: 'your-secret-key', // Change this to a secure random string
    resave: false,
    saveUninitialized: false
  }));
  
// database connection
sequelize.authenticate().then(() => {
    console.log('Database connected');
    // sequelize.sync();
}).catch((err) => {
    console.log('Error: ' + err);
});
console.log('NODE_ENV:', process.env.NODE_ENV);
// routes
// use prefix for all routes
app.use(express.json())

app.use('/admin-auth', AdminAuthRoutes)
app.use('/products', ProductRoutes)
app.use('/banner', BannerRoutes)
app.use('/image',UploadImageRoutes )
app.use('/contact', ContactRoutes)
app.use('/shipping', ShippingRoutes)
app.use('/cart', CheckoutRoutes)
app.use('/reviews',ReviewsRoutes )

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const server = http.createServer(app);
const socketIo = require('socket.io');
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('a user connected');
  
    socket.on('sendMessage', async (data) => {
      const { senderId, receiverId, text } = data;
      const message = await Message.create({ senderId, receiverId, text });
      io.to(receiverId).emit('receiveMessage', message);
    });
  
    socket.on('disconnect', () => {
      console.log('user disconnected'); 
    });
  });
   
