# Supabase Database Migrations

## Adding the Status Column

The `tasks` table needs a `status` column to support the kanban board functionality.

### How to Run the Migration

1. Open your Supabase project dashboard
2. Go to the **SQL Editor**
3. Copy and paste the contents of `migrations/add_status_column.sql`
4. Click **Run** to execute the migration

### What the Migration Does

- Adds a `status` column to the `tasks` table
- Sets the default value to `'todo'`
- Adds a constraint to only allow values: `'todo'`, `'doing'`, or `'done'`
- Updates any existing rows to have `'todo'` status

### Alternative: Manual Setup

If you prefer to set it up manually in the Supabase dashboard:

1. Go to **Table Editor** → `tasks` table
2. Click **Add Column**
3. Set:
   - **Name**: `status`
   - **Type**: `text` or `varchar`
   - **Default value**: `'todo'`
4. Add a check constraint: `status IN ('todo', 'doing', 'done')`

