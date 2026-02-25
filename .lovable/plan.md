

## Analysis

The email verification does not work because **auto-confirm is currently enabled** on the authentication system. This means:
- When a user signs up, their email is confirmed instantly (no verification email sent)
- The signup response immediately returns an `access_token` and sets `email_confirmed_at`
- The toast says "Check your email for a verification link!" but the user is already logged in

The network logs confirm this: the signup for `info@jatkojohto.fi` returned a 200 with an access token and `email_confirmed_at` set to the signup timestamp.

## Plan

### Step 1: Disable auto-confirm on authentication
Use the configure-auth tool to disable auto-confirm for email signups. This will require users to click a verification link before they can sign in.

### Step 2: Update signup handler in `src/pages/Auth.tsx`
When auto-confirm is disabled, the signup response will no longer include an access token. The current code already shows a success toast, but the `AuthProvider` will detect the session from the response and auto-navigate. We need to handle the case where signup succeeds but no session is returned:

- After `signUp()`, check if `data.session` is null (meaning email confirmation is required)
- Show the verification toast only in that case
- Clear the form fields after successful signup
- If a session IS returned (e.g. OAuth or already confirmed), let normal auth flow handle it

### Step 3: Handle unconfirmed sign-in attempts
When a user tries to sign in before confirming their email, the auth system returns an `email_not_confirmed` error. Update the error handling to show a user-friendly message like "Please verify your email address before signing in."

### Technical Details

**Auth configuration change:**
- Set `autoConfirm: false` for email signups

**Code changes in `src/pages/Auth.tsx`:**
```typescript
// In handleSubmit, after signUp:
const { data, error } = await supabase.auth.signUp({ ... });
if (error) throw error;
if (!data.session) {
  toast.success("Check your email for a verification link!");
  setEmail("");
  setPassword("");
} 
// If session exists, AuthProvider handles redirect automatically
```

No database or migration changes required.

