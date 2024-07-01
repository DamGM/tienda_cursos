import { supabase } from '../config/supabase';

class User {
  async create(data) {
    const { email, password, name } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await supabase
     .from('users')
     .insert({ email, password: hashedPassword, name, role: 'user' });
     console.log('User created:', user);
     return user;
  }

  async findByEmail(email) {
    const user = await supabase
     .from('users')
     .select('id, email, password')
     .eq('email', email)
     .single();
    return user;
  }
}

export default User;