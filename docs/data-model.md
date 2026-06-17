# Future Data Model

Milestone A defines the production direction only. It does not add migrations, Prisma, a database client, or a live PostgreSQL connection.

## Core tables

| Table | Purpose |
| --- | --- |
| `customers` | Registered retail customers with mobile/email identity |
| `customer_sessions` | Server-side session records and refresh metadata |
| `addresses` | Customer shipping addresses, province/city/postal code |
| `products` | Canonical product record: title, slug, rice type, origin, status |
| `product_variants` | Weight, package type, SKU, price, compare price |
| `inventory` | Stock by variant and fulfillment location |
| `carts` | Durable cart per customer or anonymous session |
| `cart_items` | Variant quantity and captured price metadata |
| `orders` | Order header, customer, totals, status, fulfillment state |
| `order_items` | Purchased variants, quantity, unit price, tax/discount snapshot |
| `payments` | Provider, authority/reference, status, amount, failure reason |
| `coupons` | Discount rules, validity, usage limits |
| `loyalty_ledger` | Points earned/burned with immutable references |
| `wholesale_profiles` | B2B approval, company details, purchase terms |
| `rfqs` | Wholesale request-for-quote submissions |
| `audit_logs` | Security and operational event trail |

## Boundaries

- Current Zustand account/cart/wishlist stores remain the local UI state in Milestone A.
- Milestone B should normalize product/catalog data before database work.
- Milestone C should introduce auth and persistence behind interfaces, then migrate client stores incrementally.
- Payment tables must be append-only for provider callbacks and reconciliation.

## Session direction

The future backend should issue a server session with one of these roles:

- `guest`
- `customer`
- `wholesale_buyer`
- `admin`

See `lib/security/session.ts` for the TypeScript contract used by application code.
