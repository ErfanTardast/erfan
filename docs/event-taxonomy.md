# Analytics Event Taxonomy

Milestone A defines typed events only. The default tracking sink is passive and disabled unless configured.

All events include:

- `name`
- `timestamp`
- `route`
- `locale: fa-IR`
- optional `anonymousId`
- typed `payload`

## Discovery

- `home_impression`
- `category_view`
- `filter_apply`
- `search_query`
- `zero_result_search`

## Product

- `pdp_view`
- `media_interaction`
- `compare_add`
- `wishlist_add`

## Cart and checkout

- `add_to_cart`
- `remove_from_cart`
- `begin_checkout`
- `coupon_applied`

## Payment placeholder

- `payment_started`
- `payment_success`
- `payment_failure`

## Loyalty placeholder

- `points_earned`
- `points_burned`
- `membership_started`

## Wholesale placeholder

- `rfq_submitted`
- `wholesale_reorder`

## System

- `client_error`
- `web_vital_reported`

Implementation lives in `lib/analytics/events.ts`.
