FROM php:8.4-fpm

# Cài đặt các công cụ hệ thống cần thiết
RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev zip unzip

# Xóa cache hệ thống
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Cài đặt các extension PHP (bản 8.4 đã hỗ trợ mượt mà các lệnh này)
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Lấy Composer chính chủ
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Lệnh tự động chạy khi bật container: cài thư viện và bật server
CMD composer install && php artisan serve --host=0.0.0.0 --port=8000