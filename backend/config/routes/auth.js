import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { supabase } from '../supabase';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await supabase
    .from('users')
    .insert({ email, password: hashedPassword, name, role: 'user' });
  res.json(user);
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await supabase
    .from('users')
    .select('id, email, password')
    .eq('email', email)
    .single();
  if (!user) {
    res.status(401).json({ message: 'Invalid email or password' });
  } else {
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(401).json({ message: 'Invalid email or password' });
    } else {
      const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
        expiresIn: '1h',
      });
      await supabase
        .from('sessions')
        .insert({ user_id: user.id, token, expires_at: Date.now() + 3600000 });
      res.json({ token });
    }
  }
});

router.get('/me', async (req, res) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
  } else {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await supabase
      .from('users')
      .select('id, email, name, role')
      .eq('id', decoded.userId)
      .single();
    res.json(user);
  }
});

export default router;


//El endpoint `/register` crea un nuevo usuario y devuelve el objeto de usuario.
// El endpoint `/login` autentica un usuario y devuelve un token de sesión.
// El endpoint `/me` devuelve la información del usuario autenticado.