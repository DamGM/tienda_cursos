import express from 'express';
import supabase from './config/supabase';
import authRouter from './auth';

const app = express();

app.use('/api/auth', authRouter);

app.get('/api/courses', async (req, res) => {
  const { data, error } = await supabase
   .from('courses')
   .select('id, name, description');

  if (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching courses' });
  } else {
    res.json(data);
  }
});

app.listen(3000, () => {
  console.log('Servidor en puerto 3000');
});