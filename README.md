# Grammar Checking API

A Node.js TypeScript backend API for grammar checking, similar to Grammarly's free version. This project implements clean architecture principles and provides a robust foundation for grammar checking services.

## Features

- User authentication and authorization
- Document management
- Grammar checking with multiple AI service providers
- Rate limiting for free users
- Redis caching for improved performance
- PostgreSQL database with Prisma ORM
- Docker containerization
- GitLab CI/CD pipeline

## Tech Stack

- Node.js with TypeScript
- Express.js framework
- PostgreSQL with Prisma ORM
- Redis for caching
- Jest for testing
- Docker for containerization
- GitLab CI/CD for deployment

## Prerequisites

- Node.js >= 18
- Docker and Docker Compose
- PostgreSQL
- Redis

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd grammarly-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration.

4. Start the development environment:
   ```bash
   docker-compose up -d
   ```

5. Run database migrations:
   ```bash
   npm run prisma:migrate
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Documents
- `GET /api/documents` - List user documents
- `POST /api/documents` - Create a new document
- `GET /api/documents/:id` - Get a specific document
- `PUT /api/documents/:id` - Update a document
- `DELETE /api/documents/:id` - Delete a document

### Grammar Checking
- `POST /api/grammar/check` - Check text for grammar errors

## Development

### Running Tests
```bash
npm test
```

### Linting
```bash
npm run lint
```

### Formatting
```bash
npm run format
```

## Docker

Build and run the application using Docker:
```bash
docker-compose up --build
```

## CI/CD

The project includes a GitLab CI/CD pipeline with the following stages:
- Install dependencies
- Run linting
- Run tests
- Build Docker image
- Deploy to staging/production

## Project Structure

```
backend/
├── src/
│   ├── domain/           # Business logic and entities
│   ├── application/      # Use cases and DTOs
│   ├── infrastructure/   # External services and repositories
│   ├── presentation/     # Controllers and routes
│   └── tests/           # Test files
├── prisma/              # Database schema and migrations
├── docker/             # Docker configuration
└── package.json
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 