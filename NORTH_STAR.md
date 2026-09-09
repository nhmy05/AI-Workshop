# North Star

## Product vision

Help people choose best grocery store to visit **right now** by making store crowd level visible directly on map.

Today, grocery search shows where stores are. This prototype asks stronger question:

**What if map also showed how full each store is before user choose where to go?**

## User promise

When user search grocery stores, user should understand nearby crowd levels at glance, compare options, and choose less busy store without opening every location.

## Core experience

1. User searches for grocery stores.
2. Nearby stores appear on map.
3. Each store marker communicates capacity using traffic-style colors:
   - Green: low crowd, 0–35%
   - Yellow: moderate, 36–60%
   - Orange: busy, 61–80%
   - Red: very busy, 81–100%
4. Marker also shows percentage so color not only signal.
5. User taps store to see exact prototype capacity, such as `42% full` or `42 / 100`.
6. User compares stores and chooses where to go.

## Prototype goal

Prove that **live-capacity information improves grocery-store selection experience**.

Prototype about UI/UX and product behavior, not real occupancy system. All capacity data can be mocked.

## North Star metric

**Percentage of grocery-store search sessions where capacity information influences store selection.**

For prototype testing, measure through user tasks and feedback.

Core question:

> After seeing capacity markers, does user choose different store than user would choose from distance alone?

## Success signals

- User understands marker colors fast.
- User finds least busy nearby store within seconds.
- User understands what `42% full` means.
- User prefers capacity visible directly on map.
- Capacity changes store choice in realistic scenarios.

## Prototype scope

- Map-first interface
- Grocery-store search
- Mock grocery stores
- Capacity-colored markers
- Percentage on markers
- Capacity legend
- Store detail sheet
- Mock occupancy details
- `Least busy` filter
- Mobile and desktop layouts

## Not in scope

- Real occupancy sensors
- Retailer integrations
- Authentication
- Reviews
- Street View
- Full navigation
- Traffic routing
- Saved places
- Payments
- Production backend
- Large-scale search

## Product principles

### Capacity visible before click

User should not need open every store to compare crowd.

### Color gives speed. Number gives precision.

Color gives instant signal. Percentage gives exact meaning.

### Store crowd not road traffic

Use `22% full`, `Low crowd`, and `Capacity`.

### Prototype data stay honest

Mock data must not appear as real live occupancy.

### Build differentiator, not Maps clone

Map exists to test capacity feature. Do not waste prototype effort recreating Google Maps feature-for-feature.

## One-sentence test

**Can user search grocery stores, see which nearby store least crowded in seconds, and confidently choose one using capacity layer?**

If yes, prototype works.
