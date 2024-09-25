from node:18.16.0 as build-deps
workdir /front
copy package.json pnpm-lock.yaml vite.config.ts ./
run pnpm install
copy . ./
run pnpm build








