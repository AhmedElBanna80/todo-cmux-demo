# DEMO-1: Add Todo Item (Form Submission)

## Description
Implement the ability to add a new todo item via form submission. The form must work with **and** without JavaScript (progressive enhancement).

## Acceptance Criteria
- [ ] User can submit the form via browser form submission (no JS required)
- [ ] Form validates title is not empty
- [ ] New todo appears in the list immediately after submission
- [ ] Form clears after submission
- [ ] JavaScript enhancement: form submits via fetch with optimistic updates
- [ ] Server action logs show form data received
- [ ] Tests pass: form submission, validation, server action

## Files to Create/Modify
- `app/api/tasks/route.ts` — POST handler for creating todos
- `app/actions.ts` — Server action for form handling
- `components/TodoForm.tsx` — Progressive form component
- `lib/db.ts` — In-memory todo store
- `lib/types.ts` — Todo type definitions
- `__tests__/TodoForm.test.tsx` — Form tests

## Implementation Details

### Type Definitions (`lib/types.ts`)
```typescript
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}
```

### Database (`lib/db.ts`)
Use an in-memory store for demo purposes. Support:
- `addTodo(title: string): Todo`
- `getTodos(): Todo[]`
- `getTodoById(id: string): Todo | null`

### Server Action (`app/actions.ts`)
```typescript
'use server'

export async function addTodo(formData: FormData) {
  const title = formData.get('title') as string;
  if (!title.trim()) throw new Error('Title required');
  // Add to db
  return { success: true, todo: newTodo };
}
```

### Form Component (`components/TodoForm.tsx`)
- Progressive form: works without JS
- Enhance with fetch + optimistic updates
- Show loading state during submission
- Clear input on success
- Show error message on failure

### API Route (`app/api/tasks/route.ts`)
```typescript
export async function POST(request: Request) {
  const json = await request.json();
  const todo = addTodo(json.title);
  return Response.json(todo);
}
```

## Testing
- Unit tests for validation
- Integration test for form submission
- Test optimistic updates
- Test error handling

## Definition of Done
- All acceptance criteria met
- Tests pass locally (`npm test`)
- Code follows project conventions (TypeScript strict, ESLint)
- No console errors or warnings
- Progressive enhancement verified (works without JS)
