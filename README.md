# Event Ticket Booking System - Microservices Architecture

A comprehensive event ticket booking system built with microservices architecture, featuring automated CI/CD deployment on AWS EKS with ECR integration.

## 🏗️ Architecture Overview

This system consists of 5 microservices:

- **Auth Service** (Port 3000) - User authentication using AWS Cognito
- **Bookings Service** (Port 3001) - Booking management with PostgreSQL
- **Events Service** (Port 3002) - Event management with PostgreSQL  
- **Notifications Service** (Port 3003) - Email notifications using AWS SES
- **Payments Service** (Port 3004) - Payment processing with PostgreSQL

## 🚀 Technology Stack

### Backend
- **Node.js** with **Express.js** and **TypeScript**
- **PostgreSQL** with **Prisma ORM** (for services with database)
- **AWS Cognito** for authentication
- **RabbitMQ** for inter-service communication
- **AWS SES** for email notifications

### Infrastructure
- **AWS EKS** for container orchestration
- **AWS ECR** for container registry
- **AWS CodePipeline & CodeBuild** for CI/CD
- **Docker** for containerization
- **Kubernetes** for deployment manifests

## 📋 Prerequisites

### Local Development
- Node.js 18+ 
- Docker and Docker Compose
- PostgreSQL 14+
- RabbitMQ
- AWS CLI configured
- kubectl configured for EKS access

### AWS Services Required
- AWS EKS cluster
- AWS ECR repositories (one per service)
- AWS RDS PostgreSQL instances
- AWS Cognito User Pool
- AWS SES configured
- Amazon MQ (RabbitMQ) or self-hosted RabbitMQ

## 🛠️ Service Configuration

### 1. Auth Service (No Database)

**Port:** 3000  
**Purpose:** User authentication using AWS Cognito

**Dependencies:**
```json
{
  "@aws-sdk/client-cognito-identity-provider": "AWS Cognito SDK",
  "amqplib": "RabbitMQ messaging",
  "cors": "Cross-origin requests",
  "express": "Web framework",
  "cookie-parser": "Cookie handling",
  "dotenv": "Environment variables",
  "jsonwebtoken": "JWT handling"
}
```

**Environment Variables (.env):**
```env
# Server Configuration
PORT=3000

# AWS Cognito Configuration
COGNITO_APP_CLIENT_ID=your_cognito_client_id
COGNITO_APP_CLIENT_SECRET=your_cognito_client_secret
COGNITO_REGION=ap-southeast-1
COGNITO_USER_POOL_ID=your_user_pool_id

# RabbitMQ Configuration
RABBITMQ_URL=amqp://username:password@rabbitmq-host:5672

# CORS Origins (comma-separated)
CORS_ORIGINS=http://localhost:4000,https://cloud.cisk.site,https://myevents.cisk.site
```

**Local Development:**
```bash
cd auth
npm install
npm run dev
```

**Docker Commands:**
```bash
cd auth
npm run docker:build
npm run docker:run
```

### 2. Bookings Service (With PostgreSQL + Prisma)

**Port:** 3001  
**Purpose:** Manage booking operations and payment result processing

**Dependencies:**
```json
{
  "@prisma/client": "Prisma ORM client",
  "amqplib": "RabbitMQ messaging", 
  "cors": "Cross-origin requests",
  "express": "Web framework",
  "jsonwebtoken": "JWT verification",
  "jwks-rsa": "JWT key verification",
  "dotenv": "Environment variables",
  "prisma": "Database toolkit"
}
```

**Environment Variables (.env):**
```env
# Server Configuration
PORT=3001

# Database Configuration
DATABASE_URL=postgresql://username:password@host:5432/bookings_db

# AWS Cognito Configuration (for auth middleware)
COGNITO_USER_POOL_ID=your_user_pool_id
COGNITO_REGION=ap-southeast-1

# RabbitMQ Configuration
RABBITMQ_URL=amqp://username:password@rabbitmq-host:5672

# CORS Origins
CORS_ORIGINS=http://localhost:4000,https://cloud.cisk.site,https://myevents.cisk.site
```

**Local Development:**
```bash
cd bookings
npm install

# Database setup
npm run prisma:reset
# OR for existing database
npm run prisma:generate
npm run prisma:deploy

# Start development server
npm run dev
```

**Production Deployment:**
```bash
# Includes automatic Prisma migrations
npm run start:prod
```

### 3. Events Service (With PostgreSQL + Prisma)

**Port:** 3002  
**Purpose:** Event management, booking cancellation handling, and payment result processing

**Dependencies:**
```json
{
  "@prisma/client": "Prisma ORM client",
  "amqplib": "RabbitMQ messaging",
  "cors": "Cross-origin requests", 
  "express": "Web framework",
  "jsonwebtoken": "JWT verification",
  "jwks-rsa": "JWT key verification",
  "dotenv": "Environment variables",
  "prisma": "Database toolkit"
}
```

**Environment Variables (.env):**
```env
# Server Configuration  
PORT=3002

# Database Configuration
DATABASE_URL=postgresql://username:password@host:5432/events_db

# AWS Cognito Configuration (for auth middleware)
COGNITO_USER_POOL_ID=your_user_pool_id
COGNITO_REGION=ap-southeast-1

# RabbitMQ Configuration
RABBITMQ_URL=amqp://username:password@rabbitmq-host:5672

# CORS Origins
CORS_ORIGINS=http://localhost:4000,https://cloud.cisk.site,https://myevents.cisk.site
```

**Local Development:**
```bash
cd events
npm install

# Database setup
npm run prisma:reset
# OR for existing database  
npm run prisma:generate
npm run prisma:deploy

# Start development server
npm run dev
```

### 4. Notifications Service (No Database)

**Port:** 3003  
**Purpose:** Handle email notifications using AWS SES and Nodemailer

**Dependencies:**
```json
{
  "@aws-sdk/client-ses": "AWS SES SDK",
  "amqplib": "RabbitMQ messaging",
  "aws-sdk": "AWS SDK",
  "express": "Web framework",
  "nodemailer": "Email sending",
  "kafkajs": "Kafka messaging (if used)",
  "dotenv": "Environment variables"
}
```

**Environment Variables (.env):**
```env
# Server Configuration
PORT=3003

# Email Configuration (Nodemailer)
NODEMAIL=your-email@gmail.com
APP_PASS=your-app-password

# RabbitMQ Configuration  
RABBITMQ_URL=amqp://username:password@rabbitmq-host:5672

# AWS SES Configuration (if using SES directly)
AWS_REGION=ap-southeast-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
```

**Local Development:**
```bash
cd notifications
npm install
npm run dev
```

### 5. Payments Service (With PostgreSQL + Prisma)

**Port:** 3004  
**Purpose:** Payment processing and transaction management

**Dependencies:**
```json
{
  "@prisma/client": "Prisma ORM client",
  "amqplib": "RabbitMQ messaging",
  "cors": "Cross-origin requests",
  "express": "Web framework", 
  "jsonwebtoken": "JWT verification",
  "jwks-rsa": "JWT key verification",
  "dotenv": "Environment variables",
  "prisma": "Database toolkit"
}
```

**Environment Variables (.env):**
```env
# Server Configuration
PORT=3004

# Database Configuration
DATABASE_URL=postgresql://username:password@host:5432/payments_db

# AWS Cognito Configuration (for auth middleware)
COGNITO_USER_POOL_ID=your_user_pool_id
COGNITO_REGION=ap-southeast-1

# RabbitMQ Configuration
RABBITMQ_URL=amqp://username:password@rabbitmq-host:5672

# CORS Origins
CORS_ORIGINS=http://localhost:4000,https://cloud.cisk.site,https://myevents.cisk.site
```

**Local Development:**
```bash
cd payments
npm install

# Database setup
npm run prisma:reset
# OR for existing database
npm run prisma:generate  
npm run prisma:deploy

# Start development server
npm run dev
```

## 🐳 Docker Development

### Individual Service Containers

Each service includes Docker commands in package.json:

```bash
# Build Docker image
npm run docker:build

# Run Docker container  
npm run docker:run
```

### Docker Compose (Recommended for local development)

Create a `docker-compose.yml` in the root directory:

```yaml
version: '3.8'
services:
  # PostgreSQL Database
  postgres:
    image: postgres:14
    environment:
      POSTGRES_DB: ticket_booking
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: password123
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  # RabbitMQ Message Broker
  rabbitmq:
    image: rabbitmq:3-management
    environment:
      RABBITMQ_DEFAULT_USER: admin
      RABBITMQ_DEFAULT_PASS: password123
    ports:
      - "5672:5672"
      - "15672:15672"

  # Auth Service
  auth-service:
    build: ./auth
    ports:
      - "3000:3000"
    environment:
      - PORT=3000
      - RABBITMQ_URL=amqp://admin:password123@rabbitmq:5672
    depends_on:
      - rabbitmq

  # Bookings Service  
  bookings-service:
    build: ./bookings
    ports:
      - "3001:3001"
    environment:
      - PORT=3001
      - DATABASE_URL=postgresql://admin:password123@postgres:5432/bookings_db
      - RABBITMQ_URL=amqp://admin:password123@rabbitmq:5672
    depends_on:
      - postgres
      - rabbitmq

  # Events Service
  events-service:
    build: ./events
    ports:
      - "3002:3002" 
    environment:
      - PORT=3002
      - DATABASE_URL=postgresql://admin:password123@postgres:5432/events_db
      - RABBITMQ_URL=amqp://admin:password123@rabbitmq:5672
    depends_on:
      - postgres
      - rabbitmq

  # Notifications Service
  notifications-service:
    build: ./notifications
    ports:
      - "3003:3003"
    environment:
      - PORT=3003
      - RABBITMQ_URL=amqp://admin:password123@rabbitmq:5672
    depends_on:
      - rabbitmq

  # Payments Service
  payments-service:
    build: ./payments
    ports:
      - "3004:3004"
    environment:
      - PORT=3004
      - DATABASE_URL=postgresql://admin:password123@postgres:5432/payments_db
      - RABBITMQ_URL=amqp://admin:password123@rabbitmq:5672
    depends_on:
      - postgres
      - rabbitmq

volumes:
  postgres_data:
```

**Run with Docker Compose:**
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

## ☁️ AWS EKS Deployment

### Prerequisites Setup

1. **EKS Cluster:**
```bash
# Create EKS cluster (if not exists)
eksctl create cluster --name ticket-booking-cluster --region ap-southeast-1
```

2. **ECR Repositories:**
```bash
# Create ECR repositories for each service
aws ecr create-repository --repository-name auth-service --region ap-southeast-1
aws ecr create-repository --repository-name bookings-service --region ap-southeast-1  
aws ecr create-repository --repository-name events-service --region ap-southeast-1
aws ecr create-repository --repository-name notifications-service --region ap-southeast-1
aws ecr create-repository --repository-name payments-service --region ap-southeast-1
```

3. **Configure kubectl:**
```bash
aws eks update-kubeconfig --region ap-southeast-1 --name ticket-booking-cluster
```

### CI/CD Pipeline Setup

Each service contains:
- `buildspec.yml` - CodeBuild configuration
- `*-deployment.yaml` - Kubernetes deployment manifest
- `*-configmap.yaml` - Environment configuration
- `*-secret.yaml` - Sensitive configuration

**CodePipeline Configuration:**
1. Source: GitHub repository
2. Build: CodeBuild with buildspec.yml
3. Deploy: EKS deployment with manifest substitution

**Key Features:**
- Automatic Docker image building and pushing to ECR
- Dynamic image tag substitution in Kubernetes manifests
- Automated deployment to EKS cluster
- Environment-specific configuration via ConfigMaps and Secrets

### Manual Deployment

```bash
# Build and push to ECR
export AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
export AWS_REGION=ap-southeast-1
export IMAGE_TAG=$(date +%Y%m%d%H%M%S)

# For each service (example with bookings):
cd bookings

# Build Docker image
docker build -t bookings-service:$IMAGE_TAG .

# Tag for ECR
docker tag bookings-service:$IMAGE_TAG $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/bookings-service:$IMAGE_TAG

# Push to ECR
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/bookings-service:$IMAGE_TAG

# Update deployment manifest with new image tag
sed -i "s|IMAGE_TAG|$IMAGE_TAG|g" bookings-deployment.yaml

# Deploy to Kubernetes
kubectl apply -f bookings-configmap.yaml
kubectl apply -f bookings-secret.yaml  
kubectl apply -f bookings-deployment.yaml
```

## 🔐 Security Configuration

### AWS IAM Policies

**CodeBuild Service Role Policy:**
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ecr:BatchCheckLayerAvailability",
                "ecr:GetDownloadUrlForLayer", 
                "ecr:BatchGetImage",
                "ecr:GetAuthorizationToken",
                "ecr:PutImage",
                "ecr:InitiateLayerUpload",
                "ecr:UploadLayerPart",
                "ecr:CompleteLayerUpload"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "eks:DescribeCluster"
            ],
            "Resource": "*"
        }
    ]
}
```

### Kubernetes RBAC

Create service account and role binding for deployments:

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: deployment-sa
  namespace: default
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: deployment-role
rules:
- apiGroups: ["apps"]
  resources: ["deployments"]
  verbs: ["get", "list", "create", "update", "patch"]
- apiGroups: [""]
  resources: ["pods", "services", "configmaps", "secrets"]
  verbs: ["get", "list", "create", "update", "patch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: deployment-binding
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: deployment-role
subjects:
- kind: ServiceAccount
  name: deployment-sa
  namespace: default
```

## 📊 Monitoring and Troubleshooting

### Health Checks

Each service exposes health endpoints:
```bash
# Check service health
curl http://localhost:3000/health  # Auth
curl http://localhost:3001/health  # Bookings
curl http://localhost:3002/health  # Events
curl http://localhost:3003/health  # Notifications  
curl http://localhost:3004/health  # Payments
```

### Common Issues and Solutions

#### 1. Prisma Migration Issues
```bash
# Reset database and regenerate
npm run prisma:reset

# For production
npm run prisma:deploy
```

#### 2. RabbitMQ Connection Issues  
```bash
# Check RabbitMQ status
docker exec rabbitmq rabbitmqctl status

# Check connection URL in .env files
RABBITMQ_URL=amqp://username:password@host:port
```

#### 3. EKS Deployment Issues
```bash
# Check pod status
kubectl get pods

# Check deployment logs
kubectl logs deployment/bookings-service

# Describe pod for errors
kubectl describe pod <pod-name>
```

#### 4. ECR Push Issues
```bash
# Login to ECR
aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.ap-southeast-1.amazonaws.com

# Check repository exists
aws ecr describe-repositories --region ap-southeast-1
```

## 🔄 Message Flow Architecture

### RabbitMQ Queues and Exchanges

**Inter-service Communication:**
- `booking.created` → Notifications Service
- `payment.processed` → Bookings & Events Services  
- `booking.cancelled` → Events & Notifications Services
- `user.registered` → Notifications Service

**Queue Configuration:**
```typescript
// Example publisher (Bookings Service)
await channel.assertExchange('booking', 'direct', { durable: true });
await channel.publish('booking', 'created', Buffer.from(JSON.stringify(bookingData)));

// Example subscriber (Notifications Service)  
await channel.assertQueue('booking.notifications', { durable: true });
await channel.bindQueue('booking.notifications', 'booking', 'created');
```

## 🚀 Performance Optimization

### Database Optimization
- Connection pooling in Prisma
- Database indexing on frequently queried fields
- Read replicas for read-heavy operations

### Caching Strategy  
- Redis for session management
- API response caching
- Database query result caching

### Load Balancing
- AWS Application Load Balancer
- Kubernetes service load balancing
- Auto-scaling based on CPU/memory metrics

## 📝 API Documentation

### Auth Service Endpoints
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login
- `POST /auth/refresh` - Token refresh
- `POST /auth/logout` - User logout
- `GET /auth/verify/:token` - Email verification

### Bookings Service Endpoints  
- `GET /bookings` - Get user bookings
- `POST /bookings` - Create new booking
- `GET /bookings/:id` - Get booking details
- `PUT /bookings/:id` - Update booking
- `DELETE /bookings/:id` - Cancel booking

### Events Service Endpoints
- `GET /events` - List all events
- `POST /events` - Create new event (admin)
- `GET /events/:id` - Get event details
- `PUT /events/:id` - Update event (admin)
- `DELETE /events/:id` - Delete event (admin)

### Payments Service Endpoints
- `POST /payments/process` - Process payment
- `GET /payments/:bookingId` - Get payment status
- `POST /payments/webhook` - Payment webhook

### Notifications Service
- Internal service - no direct endpoints
- Processes RabbitMQ messages for email sending

## 🔧 Development Tips

### Local Development Workflow
1. Start infrastructure (PostgreSQL, RabbitMQ) with Docker Compose
2. Run services individually with `npm run dev`
3. Use Postman/Insomnia for API testing
4. Monitor RabbitMQ management UI at http://localhost:15672
