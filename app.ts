import express from 'express';
import { careerRouter } from './routes/careers-route';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/open-positions', careerRouter);
 // we can also implement Fork worker processes here using Cluster
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
