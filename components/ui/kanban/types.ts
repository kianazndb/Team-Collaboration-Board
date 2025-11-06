export type Task = {
    id: string;        
    title: string;
    description?: string;
    status: 'todo' | 'doing' | 'done';
    order?: number;   
  };
  
  export type TasksByColumn = {
    todo: Task[];
    doing: Task[];
    done: Task[];
  };
  