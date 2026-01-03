# Developer Guide

This guide helps developers understand the codebase structure, debugging tools, and how to extend functionality.

## Code Organization

### Components (`src/components/`)

- **YurtToono.tsx**: Main interactive homepage component
  - Manages 8 radial sections
  - Handles click interactions
  - Uses logger for debugging

### Configuration (`src/config/`)

- **env.ts**: Centralized environment configuration
  - Read with `getAppConfig()`
  - Validates required variables
  - Safe for client-side use

- **payment.ts**: Payment provider configuration
  - Supports multiple providers (Stripe, PayPal, Square)
  - Environment-based configuration
  - Validation helpers

### Services (`src/services/`)

- **payment.ts**: Payment processing abstraction
  - Provider-agnostic interface
  - Easy to swap payment providers
  - Includes initialization and verification

### Utilities (`src/utils/`)

- **logger.ts**: Centralized logging system
  - Environment-aware (dev vs production)
  - Structured logging with context
  - Log history for debugging
  - Ready for external logging services

- **errorBoundary.tsx**: React error boundary
  - Catches component errors
  - Displays user-friendly fallback
  - Shows detailed errors in development

## Debugging

### Using the Logger

```typescript
import { logger } from './utils/logger'

// Different log levels
logger.debug('Detailed debug info', { userId: 123 })
logger.info('General information', { action: 'click' })
logger.warn('Warning message', { issue: 'slow connection' })
logger.error('Error occurred', error, { context: 'payment' })

// Get log history (useful for debugging)
const history = logger.getHistory()
console.table(history)
```

### Error Tracking

Errors are automatically logged. In production, configure external services:

```typescript
// In src/utils/logger.ts, uncomment and configure:
// - Sentry integration
// - LogRocket integration
// - Custom API endpoint
```

### Browser DevTools

1. **Console**: Check for logger output (prefixed with `[LEVEL]`)
2. **Network**: Monitor API calls and payment requests
3. **React DevTools**: Inspect component state and props

### Common Issues

**Issue**: Component not rendering
- Check browser console for errors
- Verify ErrorBoundary caught the error
- Check logger history for warnings

**Issue**: Payment not working
- Verify `VITE_PAYMENT_ENABLED=true`
- Check payment provider keys in environment
- Look for payment service errors in console

**Issue**: Environment variables not loading
- Variables must start with `VITE_`
- Restart dev server after changing `.env`
- Check `src/config/env.ts` for validation

## Adding New Features

### Adding a New Section to YurtToono

1. Update `sections` array in `YurtToono.tsx`:
```typescript
const sections: Section[] = [
  // ... existing sections
  { id: 'new-section', title: 'New Section', angle: 360 },
]
```

2. Add corresponding styling if needed in `YurtToono.css`

### Integrating a New Payment Provider

1. Add provider to enum in `src/config/payment.ts`:
```typescript
export enum PaymentProvider {
  // ... existing
  NEW_PROVIDER = 'new-provider',
}
```

2. Install provider SDK:
```bash
npm install new-provider-sdk
```

3. Update `src/services/payment.ts`:
```typescript
case PaymentProvider.NEW_PROVIDER:
  // Initialize SDK
  // Implement processPayment logic
  break
```

4. Update environment variables in `.env.example`

### Adding API Integration

1. Create service file in `src/services/`:
```typescript
import { getAppConfig } from '../config/env'
import { logger } from '../utils/logger'

export const fetchData = async () => {
  const config = getAppConfig()
  try {
    const response = await fetch(`${config.apiUrl}/endpoint`)
    return response.json()
  } catch (error) {
    logger.error('[API] Fetch failed', error)
    throw error
  }
}
```

2. Use in components:
```typescript
import { fetchData } from '../services/api'

useEffect(() => {
  fetchData().then(setData).catch(logger.error)
}, [])
```

## Code Style

### TypeScript

- Use explicit types for function parameters and returns
- Prefer interfaces for object shapes
- Use `unknown` instead of `any` when type is truly unknown

### Error Handling

Always wrap async operations:
```typescript
try {
  const result = await asyncOperation()
  logger.info('[Feature] Success', { result })
} catch (error) {
  logger.error('[Feature] Failed', error)
  // Handle error appropriately
}
```

### Logging Best Practices

- Use descriptive prefixes: `[ComponentName]` or `[ServiceName]`
- Include relevant context in log messages
- Use appropriate log levels (debug < info < warn < error)
- Don't log sensitive data (passwords, tokens)

## Testing Locally

### Development Server

```bash
npm run dev
```

- Hot reload enabled
- Detailed error messages
- Full logging enabled

### Production Build

```bash
npm run build
npm run preview
```

- Test production optimizations
- Verify error boundaries work
- Check performance

### Linting

```bash
npm run lint
```

- Catches common errors
- Enforces code style
- Type checking

## Performance Optimization

### Code Splitting

Already configured in Vite. To add manual splitting:

```typescript
const HeavyComponent = lazy(() => import('./HeavyComponent'))

<Suspense fallback={<Loading />}>
  <HeavyComponent />
</Suspense>
```

### Image Optimization

- Use WebP format when possible
- Lazy load images outside viewport
- Optimize before adding to project

### Bundle Analysis

```bash
npm run build
# Check dist/ folder size
# Consider code splitting for large dependencies
```

## Security Considerations

1. **Never commit `.env` files** - Already in `.gitignore`
2. **Never log sensitive data** - Check logger output
3. **Validate user input** - Before API calls
4. **Use HTTPS** - Especially for payment processing
5. **Sanitize data** - Before rendering user content

## Deployment Checklist

Before deploying to production:

- [ ] All environment variables set
- [ ] `npm run build` succeeds
- [ ] `npm run lint` passes
- [ ] Error boundary tested
- [ ] Payment integration tested (if enabled)
- [ ] Responsive design verified
- [ ] Browser compatibility checked
- [ ] Performance optimized
- [ ] Analytics configured (if enabled)

## Getting Help

1. **Check logs**: Browser console and logger history
2. **Review documentation**: This guide and DEPLOYMENT.md
3. **Check configuration**: `src/config/` files
4. **Inspect errors**: ErrorBoundary fallback in development

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run linter

# Debugging
# Check browser console for logger output
# Use React DevTools for component inspection
# Check Network tab for API calls
```

