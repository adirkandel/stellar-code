# Migration to Server-Sent Events (SSE) in TanStack Start

This document provides a comprehensive guide for migrating from traditional data fetching patterns to Server-Sent Events (SSE) in a TanStack Start application.

## Table of Contents

1. [What is SSE?](#what-is-sse)
2. [When to Use SSE](#when-to-use-sse)
3. [SSE vs. Polling vs. WebSockets](#sse-vs-polling-vs-websockets)
4. [Prerequisites](#prerequisites)
5. [Step-by-Step Migration Guide](#step-by-step-migration-guide)
6. [TanStack Start SSE Implementation](#tanstack-start-sse-implementation)
7. [Best Practices](#best-practices)
8. [Error Handling and Reconnection](#error-handling-and-reconnection)
9. [Testing SSE](#testing-sse)
10. [Deployment Considerations](#deployment-considerations)

---

## What is SSE?

Server-Sent Events (SSE) is a server push technology that enables a server to send real-time updates to a client over a single HTTP connection. Unlike traditional HTTP requests where the client initiates communication, SSE allows the server to push data to the client whenever new information is available.

### Key Characteristics

- **Unidirectional**: Data flows from server to client only
- **HTTP-based**: Uses standard HTTP protocol (works through proxies and firewalls)
- **Auto-reconnection**: Built-in reconnection with the `EventSource` API
- **Text-based**: Sends UTF-8 encoded text data (typically JSON)
- **Simple protocol**: Easy to implement on both server and client

### SSE Message Format

```
event: update
data: {"id": 1, "message": "Hello World"}
id: 12345

event: notification
data: {"type": "alert", "content": "New message received"}
id: 12346
```

---

## When to Use SSE

SSE is appropriate for:

### Ideal Use Cases

1. **Live Notifications**: Real-time alerts, notifications, and status updates
2. **Live Feeds**: News feeds, social media updates, activity streams
3. **Dashboard Updates**: Real-time metrics, analytics, monitoring data
4. **Progress Tracking**: File upload progress, long-running job status
5. **Chat Applications** (server-to-client): Broadcasting messages to users
6. **Stock Tickers**: Financial data, price updates
7. **Live Scores**: Sports scores, game updates
8. **Collaborative Features**: Showing who's online, presence indicators

### When NOT to Use SSE

- **Bidirectional Communication**: If you need client-to-server streaming, use WebSockets
- **Binary Data**: SSE only supports text; use WebSockets for binary streams
- **High-Frequency Updates**: For >100 updates/second, consider WebSockets
- **Browser Tab Limits**: Browsers limit SSE connections per domain (typically 6)

---

## SSE vs. Polling vs. WebSockets

| Feature | Polling | SSE | WebSockets |
|---------|---------|-----|------------|
| Direction | Client → Server | Server → Client | Bidirectional |
| Protocol | HTTP | HTTP | WS/WSS |
| Connection | New connection per request | Single persistent HTTP | Single persistent WS |
| Browser Support | Universal | All modern browsers | All modern browsers |
| Reconnection | Manual | Automatic | Manual |
| Overhead | High (repeated headers) | Low | Lowest |
| Proxy/Firewall | Always works | Usually works | May be blocked |
| Complexity | Simple | Simple | Complex |
| Server Resources | High | Medium | Low |
| Best For | Simple, infrequent updates | Real-time, server-push | Interactive, bidirectional |

### Decision Matrix

```
Need bidirectional communication?
├── YES → Use WebSockets
└── NO
    └── Need real-time updates?
        ├── YES
        │   └── Updates > 100/second?
        │       ├── YES → Use WebSockets
        │       └── NO → Use SSE ✓
        └── NO
            └── Updates need to be instant?
                ├── YES → Use SSE or Short Polling
                └── NO → Use Long Polling
```

---

## Prerequisites

Before implementing SSE in TanStack Start:

1. **TanStack Start Project**: Ensure you have a working TanStack Start application
2. **Server Routes**: Familiarity with TanStack Start's server routes
3. **Node.js Streaming**: Basic understanding of Node.js streams

### Required Dependencies

No additional dependencies are needed - SSE uses native browser APIs and Node.js streams.

---

## Step-by-Step Migration Guide

### Step 1: Identify Migration Candidates

Audit your current data fetching patterns:

```typescript
// BEFORE: Traditional polling or one-time fetch
// src/routes/dashboard.tsx
export const Route = createFileRoute('/dashboard')({
  loader: async () => {
    const metrics = await fetchMetrics() // One-time fetch
    return { metrics }
  },
  component: Dashboard,
})

// Client-side polling
function Dashboard() {
  const [metrics, setMetrics] = useState(initialMetrics)

  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await fetch('/api/metrics').then(r => r.json())
      setMetrics(data)
    }, 5000) // Poll every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return <MetricsDisplay metrics={metrics} />
}
```

### Step 2: Create an SSE Server Route

TanStack Start uses Nitro for server routes. Create an SSE endpoint:

```typescript
// src/routes/api/events.ts
import { eventHandler, setResponseHeader, createEventStream } from 'h3'

export default eventHandler(async (event) => {
  // Set SSE headers
  setResponseHeader(event, 'Content-Type', 'text/event-stream')
  setResponseHeader(event, 'Cache-Control', 'no-cache')
  setResponseHeader(event, 'Connection', 'keep-alive')

  // Create event stream
  const stream = createEventStream(event)

  // Send initial connection event
  await stream.push({
    event: 'connected',
    data: JSON.stringify({ status: 'connected', timestamp: Date.now() })
  })

  // Set up data source (e.g., database subscription, external API)
  const interval = setInterval(async () => {
    try {
      const metrics = await fetchLatestMetrics() // Your data fetching logic
      await stream.push({
        event: 'metrics',
        data: JSON.stringify(metrics)
      })
    } catch (error) {
      await stream.push({
        event: 'error',
        data: JSON.stringify({ message: 'Failed to fetch metrics' })
      })
    }
  }, 1000)

  // Cleanup on connection close
  stream.onClosed(() => {
    clearInterval(interval)
  })

  return stream.send()
})
```

### Step 3: Create a Custom React Hook for SSE

```typescript
// src/hooks/useSSE.ts
import { useEffect, useState, useCallback, useRef } from 'react'

interface SSEOptions {
  url: string
  events?: string[]
  onError?: (error: Event) => void
  onOpen?: () => void
  reconnectInterval?: number
  maxRetries?: number
}

interface SSEState<T> {
  data: T | null
  error: Error | null
  status: 'connecting' | 'connected' | 'disconnected' | 'error'
}

export function useSSE<T = unknown>({
  url,
  events = ['message'],
  onError,
  onOpen,
  reconnectInterval = 3000,
  maxRetries = 5,
}: SSEOptions): SSEState<T> {
  const [state, setState] = useState<SSEState<T>>({
    data: null,
    error: null,
    status: 'connecting',
  })

  const retriesRef = useRef(0)
  const eventSourceRef = useRef<EventSource | null>(null)

  const connect = useCallback(() => {
    // Don't run on server
    if (typeof window === 'undefined') return

    const eventSource = new EventSource(url)
    eventSourceRef.current = eventSource

    eventSource.onopen = () => {
      retriesRef.current = 0
      setState(prev => ({ ...prev, status: 'connected', error: null }))
      onOpen?.()
    }

    eventSource.onerror = (event) => {
      setState(prev => ({ ...prev, status: 'error' }))
      onError?.(event)

      eventSource.close()

      // Reconnection logic
      if (retriesRef.current < maxRetries) {
        retriesRef.current += 1
        setTimeout(connect, reconnectInterval)
      } else {
        setState(prev => ({
          ...prev,
          status: 'disconnected',
          error: new Error('Max retries exceeded'),
        }))
      }
    }

    // Listen to specified events
    events.forEach((eventName) => {
      eventSource.addEventListener(eventName, (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data)
          setState(prev => ({ ...prev, data, error: null }))
        } catch (e) {
          setState(prev => ({
            ...prev,
            error: new Error('Failed to parse SSE data'),
          }))
        }
      })
    })

    return eventSource
  }, [url, events, onError, onOpen, reconnectInterval, maxRetries])

  useEffect(() => {
    const eventSource = connect()

    return () => {
      eventSource?.close()
    }
  }, [connect])

  return state
}
```

### Step 4: Migrate Component to Use SSE

```typescript
// AFTER: Using SSE
// src/routes/dashboard.tsx
import { createFileRoute } from '@tanstack/react-router'
import { useSSE } from '@/hooks/useSSE'

export const Route = createFileRoute('/dashboard')({
  // Initial data can still come from loader for SSR
  loader: async () => {
    const initialMetrics = await fetchMetrics()
    return { initialMetrics }
  },
  component: Dashboard,
})

function Dashboard() {
  const { initialMetrics } = Route.useLoaderData()

  // SSE for real-time updates (client-side only)
  const { data: liveMetrics, status, error } = useSSE<Metrics>({
    url: '/api/events',
    events: ['metrics'],
    onError: (e) => console.error('SSE error:', e),
  })

  // Use live data if available, fallback to initial
  const metrics = liveMetrics ?? initialMetrics

  return (
    <div>
      <ConnectionStatus status={status} />
      {error && <ErrorBanner error={error} />}
      <MetricsDisplay metrics={metrics} />
    </div>
  )
}

function ConnectionStatus({ status }: { status: string }) {
  const statusColors = {
    connecting: 'bg-yellow-500',
    connected: 'bg-green-500',
    disconnected: 'bg-red-500',
    error: 'bg-red-500',
  }

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${statusColors[status]}`} />
      <span className="text-sm text-muted-foreground capitalize">{status}</span>
    </div>
  )
}
```

### Step 5: Handle SSE in SSR Context

SSE only works on the client. Ensure proper hydration:

```typescript
// src/components/LiveMetrics.tsx
import { useEffect, useState } from 'react'
import { useSSE } from '@/hooks/useSSE'

interface LiveMetricsProps {
  initialData: Metrics
}

export function LiveMetrics({ initialData }: LiveMetricsProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Only establish SSE connection on client
  const { data: liveData, status } = useSSE<Metrics>({
    url: '/api/events',
    events: ['metrics'],
  })

  // Server and initial client render use initialData
  // After hydration, use live data if available
  const displayData = (isClient && liveData) ? liveData : initialData

  return (
    <div>
      {isClient && <ConnectionIndicator status={status} />}
      <MetricsDisplay data={displayData} />
    </div>
  )
}
```

---

## TanStack Start SSE Implementation

### Alternative: Using Server Functions with Streaming

TanStack Start supports streaming responses in server functions:

```typescript
// src/routes/api/stream.functions.ts
import { createServerFn } from '@tanstack/react-start'

export const streamMetrics = createServerFn()
  .handler(async function* () {
    // Generator function for streaming
    while (true) {
      const metrics = await fetchLatestMetrics()
      yield metrics
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  })
```

### Using with TanStack Query

For integration with TanStack Query's caching:

```typescript
// src/hooks/useSSEQuery.ts
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

export function useSSEQuery<T>(
  queryKey: string[],
  sseUrl: string,
  initialData?: T
) {
  const queryClient = useQueryClient()

  // Set up SSE subscription
  useEffect(() => {
    if (typeof window === 'undefined') return

    const eventSource = new EventSource(sseUrl)

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      // Update the query cache with new data
      queryClient.setQueryData(queryKey, data)
    }

    return () => eventSource.close()
  }, [queryKey, sseUrl, queryClient])

  // Use React Query for the data
  return useQuery({
    queryKey,
    queryFn: () => fetch(sseUrl.replace('/events', '')).then(r => r.json()),
    initialData,
    staleTime: Infinity, // SSE keeps data fresh
  })
}
```

---

## Best Practices

### 1. Message Format Consistency

```typescript
// Define a consistent message structure
interface SSEMessage<T = unknown> {
  event: string
  data: T
  id?: string
  timestamp: number
}

// Server-side
await stream.push({
  event: 'update',
  data: JSON.stringify({
    event: 'metrics',
    data: metrics,
    id: crypto.randomUUID(),
    timestamp: Date.now(),
  } satisfies SSEMessage<Metrics>)
})
```

### 2. Heartbeat/Keep-Alive

```typescript
// Prevent connection timeouts with periodic heartbeats
const heartbeatInterval = setInterval(async () => {
  await stream.push({
    event: 'heartbeat',
    data: JSON.stringify({ timestamp: Date.now() })
  })
}, 30000) // Every 30 seconds
```

### 3. Event Namespacing

```typescript
// Use specific event names for different data types
eventSource.addEventListener('metrics:cpu', handleCPUMetrics)
eventSource.addEventListener('metrics:memory', handleMemoryMetrics)
eventSource.addEventListener('notification:alert', handleAlert)
```

### 4. Graceful Degradation

```typescript
// Fallback to polling if SSE is not supported
function useRealTimeData(url: string) {
  const supportsSSE = typeof EventSource !== 'undefined'

  if (supportsSSE) {
    return useSSE({ url })
  } else {
    return usePolling({ url, interval: 5000 })
  }
}
```

---

## Error Handling and Reconnection

### Exponential Backoff

```typescript
function calculateBackoff(retries: number, baseDelay = 1000, maxDelay = 30000) {
  const delay = Math.min(baseDelay * Math.pow(2, retries), maxDelay)
  // Add jitter to prevent thundering herd
  return delay + Math.random() * 1000
}

// In your hook
const reconnect = useCallback(() => {
  const delay = calculateBackoff(retriesRef.current)
  setTimeout(connect, delay)
  retriesRef.current += 1
}, [connect])
```

### Connection State Management

```typescript
// Track detailed connection state
type ConnectionState =
  | { status: 'connecting' }
  | { status: 'connected'; connectedAt: Date }
  | { status: 'reconnecting'; attempt: number; nextAttemptAt: Date }
  | { status: 'disconnected'; reason: string }
  | { status: 'error'; error: Error }
```

---

## Testing SSE

### Unit Testing the Hook

```typescript
// src/hooks/useSSE.test.ts
import { renderHook, act } from '@testing-library/react'
import { useSSE } from './useSSE'

// Mock EventSource
class MockEventSource {
  onopen: (() => void) | null = null
  onerror: ((e: Event) => void) | null = null
  listeners: Map<string, (e: MessageEvent) => void> = new Map()

  constructor(public url: string) {
    setTimeout(() => this.onopen?.(), 0)
  }

  addEventListener(event: string, handler: (e: MessageEvent) => void) {
    this.listeners.set(event, handler)
  }

  simulateMessage(event: string, data: unknown) {
    const handler = this.listeners.get(event)
    handler?.({ data: JSON.stringify(data) } as MessageEvent)
  }

  close() {}
}

global.EventSource = MockEventSource as any

describe('useSSE', () => {
  it('connects and receives data', async () => {
    const { result } = renderHook(() =>
      useSSE({ url: '/api/events', events: ['update'] })
    )

    expect(result.current.status).toBe('connecting')

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 10))
    })

    expect(result.current.status).toBe('connected')
  })
})
```

### Integration Testing

```typescript
// e2e/sse.spec.ts
import { test, expect } from '@playwright/test'

test('SSE updates dashboard in real-time', async ({ page }) => {
  await page.goto('/dashboard')

  // Wait for SSE connection
  await expect(page.locator('[data-testid="connection-status"]'))
    .toHaveText('connected')

  // Verify initial data
  const initialValue = await page.locator('[data-testid="metric-value"]').textContent()

  // Wait for update
  await page.waitForTimeout(2000)

  // Verify data changed
  const updatedValue = await page.locator('[data-testid="metric-value"]').textContent()
  expect(updatedValue).not.toBe(initialValue)
})
```

---

## Deployment Considerations

### 1. Load Balancer Configuration

SSE requires sticky sessions or proper load balancer configuration:

```nginx
# nginx.conf
upstream app {
    ip_hash;  # Sticky sessions
    server app1:3000;
    server app2:3000;
}

server {
    location /api/events {
        proxy_pass http://app;
        proxy_http_version 1.1;
        proxy_set_header Connection '';
        proxy_buffering off;
        proxy_cache off;
        chunked_transfer_encoding off;
    }
}
```

### 2. Cloudflare/CDN Configuration

Disable buffering for SSE endpoints:

```typescript
// Cloudflare Workers example
export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (url.pathname === '/api/events') {
      return new Response(eventStream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'X-Accel-Buffering': 'no', // Disable nginx buffering
        },
      })
    }
  }
}
```

### 3. Connection Limits

Be mindful of connection limits:

- **Browsers**: 6 SSE connections per domain (HTTP/1.1)
- **Servers**: Configure max connections appropriately
- **Consider**: Connection pooling or WebSocket upgrade for high-traffic scenarios

### 4. Memory Management

```typescript
// Server-side: Clean up resources
const connections = new Set<EventStream>()

export default eventHandler(async (event) => {
  const stream = createEventStream(event)
  connections.add(stream)

  stream.onClosed(() => {
    connections.delete(stream)
  })

  // Broadcast to all connections
  function broadcast(data: unknown) {
    for (const conn of connections) {
      conn.push({ data: JSON.stringify(data) })
    }
  }

  return stream.send()
})
```

---

## Migration Checklist

- [ ] Identify components using polling or frequent refetching
- [ ] Create SSE server route(s) in `src/routes/api/`
- [ ] Implement `useSSE` hook or integrate with existing state management
- [ ] Update components to consume SSE data
- [ ] Implement proper error handling and reconnection
- [ ] Add connection status indicators to UI
- [ ] Test SSE functionality locally
- [ ] Configure deployment environment for SSE
- [ ] Monitor SSE connections in production
- [ ] Set up alerts for connection failures

---

## References

- [MDN: Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)
- [TanStack Start Documentation](https://tanstack.com/start/latest/docs/framework/react/overview)
- [H3 Event Handler Documentation](https://h3.unjs.io/)
- [Nitro Server Documentation](https://nitro.unjs.io/)
