#from node:18.16.0 as build-deps
#workdir /front
#copy package.json pnpm-lock.yaml vite.config.ts ./
#run pnpm install
#copy . ./
#run pnpm build

# так же берём готовый контейнер с node на основе alpine
FROM node:18.16
# Задаем рабочий каталог
WORKDIR /usr/src/app
# Копируем туда наши json файлы
#ADD *.json ./
# Копируем json файлы и tsconfig
COPY package.json pnpm-lock.yaml tsconfig.json tsconfig.node.json ./

RUN npm install -g pnpm && pnpm -v
## Устанавливаем все пакеты и зависимости указанные в json
RUN pnpm install
#COPY package.json pnpm-lock.yaml vite.config.ts ./

# Добавляем каталоги public и src.
# можно воспользоваться командой COPY . . но если вы синхронизировали node_modules,
# то будете ждать пока зальётся этот каталог целиком.
# да и потом могут возникнуть проблемы.
#ADD ./public ./public
#ADD ./src ./src

# Копируем остальные файлы
COPY ./public ./public
COPY ./src ./src
COPY vite.config.ts ./

# Собираем приложение
RUN npm run build

# Expose the port the app runs on
EXPOSE 5173

# Command to run the application
CMD ["pnpm", "start"]



