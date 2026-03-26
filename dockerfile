FROM node:22-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD npm run dev

# docker build -t chat-api .
# docker run -d --restart always --name chat-api -p 5000:5000 chat-api