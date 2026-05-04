# DEMO-2: Mark Todo Complete

## Description
Implement the ability to mark a todo item as complete/incomplete via checkbox. Works without JavaScript (form submission), enhanced with fetch.

## Acceptance Criteria
- [ ] Checkbox state reflects in database
- [ ] Works with form submission (no JS)
- [ ] JavaScript enhancement: checkbox updates via fetch without reload
- [ ] Optimistic UI: checked state shows immediately
- [ ] Accessibility: proper label associations, semantic HTML
- [ ] Tests pass: toggle on/off, optimistic updates, rollback on error

## Files to Create/Modify
- `app/api/tasks/[id]/route.ts` — PATCH handler for update
- `app/actions.ts` — Server action for toggle (add to existing)
- `components/TodoItem.tsx` — Progressive checkbox component
- `lib/db.ts` — Support updates (add `updateTodo` method)
- `__tests__/TodoItem.test.tsx` — Checkbox tests

## Implementation Details

### Database Update (`lib/db.ts`)
```typescript
export function toggleTodo(id: string): Todo | null {
  const todo = getTodoById(id);
  if (!todo) return null;
  todo.completed = !todo.completed;
  return todo;
}
```

### Server Action (`app/actions.ts`)
```typescript
'use server'

export async function toggleTodo(id: string) {
  const todo = updateTodo(id, { completed: !getTodoById(id)?.completed });
  return todo;
}
```

### API Route (`app/api/tasks/[id]/route.ts`)
```typescript
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const json = await request.json();
  const todo = toggleTodo(params.id);
  if (!todo) return Response.json({ error: 'Not found' }, { status: 404 });
  return Response.json(todo);
}
```

### Checkbox Component (`components/TodoItem.tsx`)
- Form with hidden checkbox field (works without JS)
- Enhance with fetch on change event
- Show optimistic state immediately
- Rollback on error
- Loading state

## Testing
- Unit test for toggle logic
- Integration test for checkbox form submission
- Test optimistic update + rollback
- Test error handling
- Accessibility test (label associations)

## Definition of Done
- All acceptance criteria met
- Tests pass locally
- No hydration mismatches (SSR/client consistency)
- Optimistic updates work correctly
- Fallback to form submission works without JS
