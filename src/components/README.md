# LoadingSkeleton Component

Component này cung cấp các skeleton loading cho các trang khác nhau trong ứng dụng e-commerce.

## Các Component có sẵn

### 1. ProductCardSkeleton
Skeleton cho product card, hiển thị:
- Hình ảnh placeholder
- Tên sản phẩm placeholder
- Mô tả placeholder
- Giá placeholder

### 2. ProductDetailSkeleton
Skeleton cho trang chi tiết sản phẩm, hiển thị:
- Nút quay lại placeholder
- Tiêu đề placeholder
- Rating stars placeholder
- Mô tả placeholder
- Giá và nút mua placeholder
- Hình ảnh sản phẩm placeholder

### 3. SearchSkeleton
Skeleton cho trang tìm kiếm, hiển thị:
- Tiêu đề placeholder
- Grid 8 product card skeletons

### 4. FavoriteSkeleton
Skeleton cho trang yêu thích, hiển thị:
- Tiêu đề placeholder
- Grid 4 product card skeletons

## Cách sử dụng

```jsx
import { ProductCardSkeleton, ProductDetailSkeleton } from '../components/LoadingSkeleton';

// Trong component
{loading ? (
  <ProductCardSkeleton />
) : (
  // Nội dung thực
)}
```

## Tính năng

- **Responsive**: Tự động điều chỉnh theo kích thước màn hình
- **Animation**: Sử dụng CSS animation pulse để tạo hiệu ứng loading
- **Tailwind CSS**: Sử dụng Tailwind CSS classes cho styling
- **Reusable**: Có thể tái sử dụng ở nhiều nơi trong ứng dụng

## Animation

Skeleton sử dụng animation `pulse` được định nghĩa trong `src/index.css`:

```css
@keyframes pulse {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
}

.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
``` 