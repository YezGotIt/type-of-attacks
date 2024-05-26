Protecting against client-side open redirect vulnerabilities involves validating and sanitizing user input, especially URLs used for redirection, and implementing secure coding practices. Here are some steps to protect against these vulnerabilities:

### Steps to Protect Client-Side Code

1. **Validate URLs**: Ensure that any URL used for redirection is validated against a whitelist of allowed domains.

Example:

```javascript
const ALLOWED_DOMAINS = ['trusted.com', 'example.com'];

function isSafeUrl(url) {
  try {
    const parsedUrl = new URL(url);
    return ALLOWED_DOMAINS.includes(parsedUrl.hostname);
  } catch (err) {
    return false;
  }
}
```

2. **Sanitize Input**: Use functions to encode and decode URLs properly to prevent injection attacks.

Example:

```javascript
const encodedUrl = encodeURIComponent(userInputUrl);
const decodedUrl = decodeURIComponent(encodedUrl);
```

3. **Use Secure Coding Practices**: Avoid directly inserting user input into URLs without proper checks.

Example:

```javascript
function redirectToUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const redirectUrl = urlParams.get('url');

  if (redirectUrl && isSafeUrl(redirectUrl)) {
    const encodedUrl = encodeURIComponent(redirectUrl);
    window.location.href = decodeURIComponent(encodedUrl);
  } else {
    console.error('Invalid redirect URL');
  }
}

redirectToUrl();
```

4. **Avoid Dynamic Redirection**: Limit the use of dynamic redirection and, when necessary, ensure it's done securely.

Example:

```javascript
const ALLOWED_REDIRECTS = {
  'dashboard': '/dashboard',
  'profile': '/profile',
  'settings': '/settings'
};

function getRedirectPath(key) {
  return ALLOWED_REDIRECTS[key] || '/';
}

function redirectToPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const redirectKey = urlParams.get('page');
  const redirectPath = getRedirectPath(redirectKey);

  window.location.href = redirectPath;
}

redirectToPage();
```

### Example Code to Prevent Client-Side Open Redirects

#### Vulnerable Client-Side Code

```javascript
// Example of vulnerable client-side code
const urlParams = new URLSearchParams(window.location.search);
const redirectUrl = urlParams.get('url');
if (redirectUrl) {
  window.location.href = redirectUrl;
}
```

#### Secure Client-Side Code

Here’s how to modify the vulnerable code to ensure it’s secure:

```javascript
const ALLOWED_DOMAINS = ['trusted.com', 'example.com'];

function isSafeUrl(url) {
  try {
    const parsedUrl = new URL(url);
    return ALLOWED_DOMAINS.includes(parsedUrl.hostname);
  } catch (err) {
    return false;
  }
}

function redirectToUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const redirectUrl = urlParams.get('url');

  if (redirectUrl && isSafeUrl(redirectUrl)) {
    window.location.href = redirectUrl;
  } else {
    console.error('Invalid redirect URL');
  }
}

redirectToUrl();
```

### Explanation

1. **Allowed Domains**: The `ALLOWED_DOMAINS` array contains the list of domains that are considered safe for redirection.

2. **URL Validation Function**: The `isSafeUrl` function checks if the provided URL’s domain is in the allowed domains list. It uses the `URL` constructor to parse the URL and extract the hostname. If the URL is invalid, it catches the error and returns `false`.

3. **Redirection Logic**: The `redirectToUrl` function retrieves the `url` parameter from the query string, validates it using the `isSafeUrl` function, and redirects to it if it is safe. If the URL is not safe, it logs an error message.

### Additional Security Measures

1. **Input Encoding**: Always encode user input using `encodeURIComponent` and decode it using `decodeURIComponent` to prevent injection attacks.

Example:

```javascript
const encodedUrl = encodeURIComponent(userInputUrl);
const decodedUrl = decodeURIComponent(encodedUrl);
```

2. **User Confirmation**: Prompt users to confirm redirections, especially if the destination URL is external or not commonly used.

Example:

```javascript
function redirectToUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const redirectUrl = urlParams.get('url');

  if (redirectUrl && isSafeUrl(redirectUrl)) {
    if (confirm(`You are being redirected to ${redirectUrl}. Do you want to proceed?`)) {
      window.location.href = redirectUrl;
    }
  } else {
    console.error('Invalid redirect URL');
  }
}

redirectToUrl();
```

3. **Avoid Query Parameters for Sensitive Actions**: Where possible, avoid using query parameters for actions that involve redirection. Use server-side logic to handle such actions securely.

Example:

Instead of:

```plaintext
https://example.com/login?redirect=http://trusted.com
```

Use:

```javascript
// Server-side redirection handling
app.post('/login', (req, res) => {
  // Authentication logic
  if (authenticated) {
    res.redirect('/dashboard');
  } else {
    res.redirect('/login');
  }
});
```

4. **Content Security Policy (CSP)**: Implement CSP headers to restrict the sources from which scripts can be loaded and executed, reducing the risk of malicious scripts being run on the client side.

Example CSP Header:

```plaintext
Content-Security-Policy: default-src 'self'; script-src 'self' 'https://trusted.com'; object-src 'none'; style-src 'self' 'https://trusted.com';
```

Implementing CSP in Express.js:

```javascript
const express = require('express');
const helmet = require('helmet');
const app = express();

// Use helmet to set CSP headers
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", 'https://trusted.com'],
    objectSrc: ["'none'"],
    styleSrc: ["'self'", 'https://trusted.com']
  }
}));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

### Example with User Confirmation

Adding a user confirmation step can enhance security:

```javascript
const ALLOWED_DOMAINS = ['trusted.com', 'example.com'];

function isSafeUrl(url) {
  try {
    const parsedUrl = new URL(url);
    return ALLOWED_DOMAINS.includes(parsedUrl.hostname);
  } catch (err) {
    return false;
  }
}

function redirectToUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const redirectUrl = urlParams.get('url');

  if (redirectUrl && isSafeUrl(redirectUrl)) {
    if (confirm(`You are being redirected to ${redirectUrl}. Do you want to proceed?`)) {
      window.location.href = redirectUrl;
    }
  } else {
    console.error('Invalid redirect URL');
  }
}

redirectToUrl();
```

### Summary

Protecting client-side code from open redirect vulnerabilities involves validating and sanitizing user input, using secure coding practices, and implementing additional security measures like user confirmation and CSP headers. By following these steps, you can mitigate the risk of open redirects and ensure a more secure web application.