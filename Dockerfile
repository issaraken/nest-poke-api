# ใช้ Node.js 18 Alpine
FROM node:18-alpine

# ตั้ง working directory
WORKDIR /app

# คัดลอก package files
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกโค้ดทั้งหมด
COPY . .

# Build application
RUN npm run build

# เปิด port 3000
EXPOSE 3000

# รัน production server
CMD ["npm", "run", "start:prod"]
