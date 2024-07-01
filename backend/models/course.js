import { supabase } from '../config/supabase';

class Course {
  async create(data) {
    const { title, description, price } = data;
    const course = await supabase
     .from('courses')
     .insert({ title, description, price });
    return course;
  }

  async getAll() {
    const courses = await supabase
     .from('courses')
     .select('id, title, description, price');
    return courses;
  }
}

export default Course;