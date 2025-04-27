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
COPY composer.json composer.lock ./
RUN composer update --no-dev --optimize-autoloader --no-interaction --prefer-dist
COPY . .
# Cria logs e cache e ajusta permissões
RUN mkdir -p storage/logs bootstrap/cache && chown -R www-data:www-data storage bootstrap/cache

# Substitui config padrão do Apache para servir /public
COPY apache/000-default.conf /etc/apache2/sites-available/000-default.conf
