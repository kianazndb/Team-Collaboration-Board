import { supabase } from './client';
import { Task } from '@/components/ui/kanban/types';

export async function updateTaskStatus(id: string, newStatus: Task['status']) {
  const { data, error } = await supabase
    .from('tasks')
    .update({ status: newStatus })
    .eq('id', id);

  if (error) console.error('Error updating task status:', error);
  return data;
}
