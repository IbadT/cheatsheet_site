import { applyDecorators } from '@nestjs/common';
import { HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function SignUpApiDocs() {
  return applyDecorators(
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Зарегистрироваться' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Success',
      schema: {
        example: {
          access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImliYWR0b2ZmQGdtYWlsLmNvbSIsImlkIjoiMjBlYzU5NGMtYmQ4NC00M2Q5LTliNzgtMzZiNTI4ODNhNGU3IiwiaWF0IjoxNzM3MTg0MTc3LCJleHAiOjE3MzcxODQyMzd9.eYCVkTrk_5-30Rc1NMqLThlib7megyfR0bXsMERh4zs",
          refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImliYWR0b2ZmQGdtYWlsLmNvbSIsImlkIjoiMjBlYzU5NGMtYmQ4NC00M2Q5LTliNzgtMzZiNTI4ODNhNGU3IiwiaWF0IjoxNzM3MTg0MTc3LCJleHAiOjE3Mzc3ODg5Nzd9.aoeGI2HeSo5a4t5NPDjfrlf4qzoYj3QlJVSR-0vyYrk"
        }
      },
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid ID supplied',
      schema: {
        example: {
          statusCode: 400,
          message: 'Invalid ID',
          error: 'Bad Request',
        },
      },
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'Unauthorized access',
      schema: {
        example: {
          statusCode: 401,
          message: 'Unauthorized',
          error: 'Unauthorized',
        },
      },
    }),
    ApiResponse({
      status: HttpStatus.REQUEST_TIMEOUT,
      description: 'Request timed out',
      schema: {
        example: {
          statusCode: 408,
          message: 'Request Timeout',
          error: 'Request Timeout',
        },
      },
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error',
      schema: {
        example: {
          statusCode: 500,
          message: 'Internal Server Error',
          error: 'Internal Server Error',
        },
      },
    }),
  );
}
