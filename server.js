const express = require('express');
const cors = require('cors');
require('dotenv').config();
const errorHandler = require('./middlewares/errorHandler');
const rateLimit = require('express-rate-limit');


const reviewRoutes = require('./routes/reviewRoutes');



const app = express();
app.use(cors({
    origin: 'http://localhost:5173'
}
));
app.use(express.json());


const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 2 // max 10 requests per minute per IP
});

app.use(limiter);


app.use('/api/review', reviewRoutes);


app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
