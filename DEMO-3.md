# DEMO-3: Delete Todo with Confirmation

## Description
Implement the ability to delete a todo item. Must show confirmation (works without JS via form, enhanced with dialog/modal).

## Acceptance Criteria
- [ ] Delete button visible on each todo
- [ ] Click shows confirmation (form-based: page redirect, JS-based: modal)
- [ ] Confirmed deletion removes todo from list and database
- [ ] Without JS: form submission with confirmation page
- [ ] With JS: native confirm() or custom modal
- [ ] Undo / error recovery: show error message on failed delete
- [ ] Tests pass: delete flow, confirmation required, error handling

## Files to Create/Modify
- `app/api/tasks/[id]/route.ts` — DELETE handler (add to existing)
- `app/actions.ts` — Server action for delete (add to existing)
- `components/TodoDeleteButton.tsx` — Progressive delete component with confirmation
- `lib/db.ts` — Support deletion (add `deleteTodo` method)
- `__tests__/TodoDeleteButton.test.tsx` — Delete tests

## Implementation Details

### Database Update (`lib/db.ts`)
```typescript
export function deleteTodo(id: string): boolean {
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) return false;
  todos.splice(index, 1);
  return true;
}
```

### Server Action (`app/actions.ts`)
```typescript
'use server'

export async function deleteTodo(id: string) {
  const success = deleteTodo(id);
  if (!success) throw new Error('Todo not found');
  return { success: true };
}
```

### API Route (`app/api/tasks/[id]/route.ts`)
```typescript
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const success = deleteTodo(params.id);
  if (!success) return Response.json({ error: 'Not found' }, { status: 404 });
  return Response.json({ success: true });
}
```

### Delete Button Component (`components/TodoDeleteButton.tsx`)
- Form with hidden confirm field
- Without JS: form submission navigates to confirm page
- With JS: show native confirm() or custom modal dialog
- On confirm: submit delete request
- Show error message if deletion fails
- Loading state during deletion

### Confirm Page (Optional)
- If user submitted without JS confirmation, show a confirmation page
- Ask "Are you sure?" with Cancel / Confirm Delete buttons

## Testing
- Unit test for delete logic
- Integration test for delete form submission
- Test confirmation flow (required before deletion)
- Test error handling (todo not found, server error)
- Test optimistic deletion + rollback

## Definition of Done
- All acceptance criteria met
- Tests pass locally
- Confirmation always required before deletion
- User safety: clear error messages
- Fallback to form submission works without JS
- No orphaned deleted todos in state
