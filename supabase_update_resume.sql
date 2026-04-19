-- Add columns for lesson resume functionality
alter table public.profiles
add column if not exists last_lesson_lang text,
add column if not exists last_lesson_module text,
add column if not exists last_lesson_index integer default 0;
