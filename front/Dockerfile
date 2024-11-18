# Используем Node.js 18.16 на базе Alpine для меньшего размера образа
FROM node:18.16

# Задаем рабочий каталог
WORKDIR /front/src
#WORKDIR /usr/src/app

# Копируем json файлы и tsconfig
#COPY package.json pnpm-lock.yaml tsconfig.json tsconfig.node.json ./
ADD *.json ./

# Устанавливаем pnpm и проверяем версию
RUN npm install -g pnpm && pnpm -v

# Устанавливаем зависимости
RUN pnpm install


### Копируем остальные файлы проекта (public, src, vite.config.ts)
#COPY ./public ./public
#COPY ./src ./src
#COPY vite.config.ts ./
#COPY index.html ./
##Убедитесь, что эта строка присутствует
#
## Собираем приложение
#RUN pnpm build
#
## Открываем порт, на котором приложение работает
#EXPOSE 5173
#
## Запускаем приложение
#CMD ["pnpm", "start"]
ADD ./public ./public
ADD ./src ./src
