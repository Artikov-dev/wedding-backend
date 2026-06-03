# API ENDPOINTS QUICK REFERENCE

## Authentication
All endpoints except public ones require:
- Header: `Authorization: Bearer {JWT_TOKEN}`
- Headers automatically set by middleware: `x-user-id`, `x-user-role`, `x-user-email`

## Hall Approvals

### List All Approvals
```
GET /api/admin/hall-approvals
?page=1&limit=20&status=PENDING
Auth: ADMIN only
```

### Get Approval Details
```
GET /api/admin/hall-approvals/{id}
Auth: ADMIN only
```

### Approve Hall
```
PATCH /api/admin/hall-approvals/{id}/approve
Body: { adminComment?: string }
Auth: ADMIN only
Response: Updated HallApprovalRequest with status=APPROVED
```

### Reject Hall
```
PATCH /api/admin/hall-approvals/{id}/reject
Body: { adminComment: string } (required)
Auth: ADMIN only
Response: Updated HallApprovalRequest with status=REJECTED
```

---

## Calendar Management

### List Calendar Entries
```
GET /api/halls/calendar?hallId={id}&startDate=2025-01-01&endDate=2025-12-31&page=1&limit=30
Auth: Required
```

### Add Calendar Entry
```
POST /api/halls/calendar
Body: {
  hallId: string,
  date: "2025-06-15",
  isAvailable: true,
  notes?: string
}
Auth: HALL_OWNER or ADMIN
```

### Update Calendar Entry
```
PUT /api/halls/calendar/{hallId}/{date}
Body: {
  isAvailable: true,
  notes?: string
}
Auth: HALL_OWNER or ADMIN
```

### Delete Calendar Entry
```
DELETE /api/halls/calendar/{hallId}/{date}
Auth: HALL_OWNER or ADMIN
```

---

## Owner Management

### List All Owners
```
GET /api/owners?search=john&page=1&limit=20
Auth: ADMIN only
Query: search (name, email, phone)
```

### Create Owner
```
POST /api/owners
Body: {
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  temporaryPassword: string
}
Auth: ADMIN only
```

### Get Owner Details
```
GET /api/owners/{id}
Auth: ADMIN or self
```

### Update Owner
```
PUT /api/owners/{id}
Body: {
  firstName?: string,
  lastName?: string,
  phone?: string
}
Auth: ADMIN or self
```

### Delete Owner
```
DELETE /api/owners/{id}
Auth: ADMIN only (fails if owner has halls)
```

---

## Owner Assignment

### Assign Owner to Hall
```
POST /api/admin/assign-owner
Body: {
  hallId: string,
  ownerId: string
}
Auth: ADMIN only
```

### Remove Owner from Hall
```
DELETE /api/admin/assign-owner?hallId={id}&ownerId={id}
Auth: ADMIN only
```

---

## My Bookings (Customer)

### List My Bookings
```
GET /api/my-bookings?status=CONFIRMED&page=1&limit=20
Auth: CUSTOMER only
```

### Get Booking Details
```
GET /api/my-bookings/{bookingId}
Auth: CUSTOMER only
```

---

## Owner Bookings Management

### List Hall Bookings
```
GET /api/owner/bookings?hallId={hallId}&status=CONFIRMED&page=1&limit=20
Auth: HALL_OWNER or ADMIN
```

### Get Booking Details
```
GET /api/owner/bookings/{bookingId}
Auth: HALL_OWNER (must own hall) or ADMIN
```

### Update Booking Status
```
PATCH /api/owner/bookings/{bookingId}/status
Body: {
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED"
}
Auth: HALL_OWNER or ADMIN
```

---

## Image Upload

### Upload Image
```
POST /api/upload/image
Form Data or JSON:
{
  imageType: "HALL" | "SERVICE" | "PROFILE",
  folder?: string,
  file: File or base64
}
Auth: Required
Response: {
  public_id: string,
  secure_url: string,
  url: string,
  width: number,
  height: number
}
Note: Placeholder for Cloudinary integration
```

---

## Singer Management

### List Singers
```
GET /api/singers?search=name&status=AVAILABLE&orderBy=rating&page=1&limit=20
Auth: None (public)
```

### Create Singer
```
POST /api/singers
Body: {
  name: string,
  phone: string,
  description?: string,
  imageUrl?: string,
  price: number
}
Auth: ADMIN only
```

### Get Singer
```
GET /api/singers/{id}
Auth: None
```

### Update Singer
```
PUT /api/singers/{id}
Body: {
  name?: string,
  phone?: string,
  description?: string,
  imageUrl?: string,
  price?: number,
  status?: "AVAILABLE" | "UNAVAILABLE"
}
Auth: ADMIN only
```

### Delete Singer
```
DELETE /api/singers/{id}
Auth: ADMIN only
```

---

## Car Management

### List Cars
```
GET /api/cars?search=name&status=AVAILABLE&page=1&limit=20
Auth: None (public)
```

### Create Car
```
POST /api/cars
Body: {
  name: string,
  model: string,
  price: number,
  description?: string,
  imageUrl?: string
}
Auth: ADMIN only
```

### Get Car
```
GET /api/cars/{id}
Auth: None
```

### Update Car
```
PUT /api/cars/{id}
Body: {
  name?: string,
  model?: string,
  price?: number,
  description?: string,
  imageUrl?: string,
  status?: "AVAILABLE" | "UNAVAILABLE"
}
Auth: ADMIN only
```

### Delete Car
```
DELETE /api/cars/{id}
Auth: ADMIN only
```

---

## Menu Management

### List Menus
```
GET /api/menus?hallId={id}&status=ACTIVE&page=1&limit=20
Auth: None (public)
```

### Create Menu
```
POST /api/menus
Body: {
  hallId: string,
  name: string,
  description?: string,
  price: number,
  vegetarianPrice?: number,
  servingSize: string,
  items?: [
    {
      itemName: string,
      description?: string,
      category: string,
      isVegetarian: boolean
    }
  ]
}
Auth: HALL_OWNER (own hall) or ADMIN
```

### Get Menu
```
GET /api/menus/{id}
Auth: None
```

### Update Menu
```
PUT /api/menus/{id}
Body: {
  name?: string,
  description?: string,
  price?: number,
  vegetarianPrice?: number,
  servingSize?: string,
  status?: "ACTIVE" | "INACTIVE"
}
Auth: HALL_OWNER (own hall) or ADMIN
```

### Delete Menu
```
DELETE /api/menus/{id}
Auth: HALL_OWNER (own hall) or ADMIN
```

---

## Regions

### List Regions
```
GET /api/regions?page=1&limit=50&includeInactive=false
Auth: None (public)
```

### Create Region
```
POST /api/regions
Body: {
  name: string,
  code: string,
  description?: string
}
Auth: ADMIN only
```

---

## Districts

### List Districts
```
GET /api/districts?regionId={id}&page=1&limit=50&includeInactive=false
Auth: None (public)
Query: regionId (optional, filter by region)
```

### Create District
```
POST /api/districts
Body: {
  regionId: string,
  name: string,
  code: string,
  description?: string
}
Auth: ADMIN only
```

---

## Owner Dashboard

### Dashboard Overview
```
GET /api/owner/dashboard?type=overview
Auth: HALL_OWNER only
Response: {
  totalHalls: number,
  totalBookings: number,
  activeBookings: number,
  totalRevenue: number,
  monthlyRevenue: number,
  averageRating: number,
  halls: []
}
```

### Revenue Data
```
GET /api/owner/dashboard?type=revenue
Auth: HALL_OWNER only
Response: {
  total: number,
  completed: number,
  pending: number,
  failed: number,
  monthly: [{month, amount}]
}
```

### Analytics
```
GET /api/owner/dashboard?type=analytics
Auth: HALL_OWNER only
Response: {
  totalBookings, confirmedBookings, completedBookings,
  cancelledBookings, totalRevenue, averageBookingValue,
  upcomingBookings
}
```

---

## Admin Dashboard

### Dashboard Overview
```
GET /api/admin/dashboard?type=overview
Auth: ADMIN only
Response: {
  totalUsers, totalOwners, totalHalls, totalBookings,
  activeBookings, totalRevenue, monthlyRevenue,
  topRatedHalls, averageBookingValue
}
```

### Analytics
```
GET /api/admin/dashboard?type=analytics
Auth: ADMIN only
Response: {
  bookings: {...}, payments: {...}, users: {...}, halls: {...}
}
```

### Trends
```
GET /api/admin/dashboard?type=trends
Auth: ADMIN only
Response: [
  {month, bookings, completedBookings, revenue} (last 12 months)
]
```

---

## Common Status Codes

- `200 OK` - Successful GET/PUT/DELETE
- `201 Created` - Successful POST
- `400 Bad Request` - Validation error
- `401 Unauthorized` - Missing/invalid authentication
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## Response Format

All successful responses follow this format:
```json
{
  "success": true,
  "message": "Description",
  "data": {}
}
```

Error responses:
```json
{
  "success": false,
  "message": "Error message",
  "detail": "Additional details"
}
```

---

## Pagination

Most list endpoints support:
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20-50)

Response includes:
```json
{
  "data": [],
  "pagination": {
    "total": number,
    "page": number,
    "limit": number,
    "pages": number
  }
}
```
