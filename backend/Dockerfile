# Dockerfile para o backend Lumen
FROM php:8.2-apache

# Instala extensões PHP necessárias
RUN apt-get update && apt-get install -y \
    libzip-dev unzip libxml2-dev libcurl4-openssl-dev \
    && docker-php-ext-install pdo pdo_mysql xml zip curl \
    && a2enmod rewrite

# Instala Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
