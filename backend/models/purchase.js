import { supabase } from '../config/supabase';

class Purchase {
  async create(data) {
    const { userId, courseId, purchaseDate, amount } = data;
    const purchase = await supabase
     .from('purchases')
     .insert({ user_id: userId, course_id: courseId, purchase_date: purchaseDate, amount });
    return purchase;
  }

  async getByUser(userId) {
    const purchases = await supabase
     .from('purchases')
     .select('id, user_id, course_id, purchase_date, amount')
     .eq('user_id', userId);
    return purchases;
  }
}

export default Purchase;