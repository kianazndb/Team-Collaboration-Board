-- Add status column to tasks table
-- Run this migration in your Supabase SQL Editor

-- Check if the column already exists before adding it
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'tasks' 
        AND column_name = 'status'
    ) THEN
        ALTER TABLE tasks 
        ADD COLUMN status VARCHAR(20) DEFAULT 'todo' 
        CHECK (status IN ('todo', 'doing', 'done'));
    END IF;
END $$;

-- Update existing rows to have 'todo' status if they don't have one
UPDATE tasks 
SET status = 'todo' 
WHERE status IS NULL;

