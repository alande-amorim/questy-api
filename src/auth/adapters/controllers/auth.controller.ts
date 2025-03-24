import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from '../../services/auth.service';
import {
  AuthResponseDTO,
  SigninRequestDTO,
  SignupRequestDTO,
  ConfirmSignupRequestDTO,
} from './dtos';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { Auth } from '#domain/types/auth';
import { AuthGuard } from '../../guards/auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get current user' })
  @ApiResponse({
    status: 200,
    description: 'Current user details',
    schema: {
      type: 'object',
      properties: {
        sub: {
          type: 'string',
          example: '123e4567-e89b-12d3-a456-426614174000',
        },
        email: {
          type: 'string',
          example: 'user@example.com',
        },
        name: {
          type: 'string',
          example: 'John Doe',
        },
        email_verified: {
          type: 'boolean',
          example: true,
        },
        cognito: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              example: 'user@example.com',
            },
            groups: {
              type: 'array',
              items: {
                type: 'string',
              },
              example: [],
            },
          },
        },
      },
    },
  })
  @ApiBearerAuth('access-token')
  async me(@CurrentUser() user: Auth.CognitoUser): Promise<Auth.CognitoUser> {
    return user;
  }

  @Post('signup')
  @ApiOperation({ summary: 'Sign up a new user with Cognito' })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'user@example.com',
        },
        password: {
          type: 'string',
          example: 'password123',
        },
        name: {
          type: 'string',
          example: 'John Doe',
        },
      },
      required: ['email', 'password', 'name'],
    },
  })
  async signUp(@Body() signUpRequest: SignupRequestDTO): Promise<void> {
    await this.authService.signUp(signUpRequest);
  }

  @Post('signup/confirm')
  @ApiOperation({ summary: 'Confirm user signup with verification code' })
  @ApiResponse({
    status: 200,
    description: 'Signup successfully confirmed',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid verification code',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'user@example.com',
        },
        code: {
          type: 'string',
          example: '123456',
        },
      },
      required: ['email', 'code'],
    },
  })
  async confirmSignUp(
    @Body() confirmSignUpRequest: ConfirmSignupRequestDTO,
  ): Promise<void> {
    await this.authService.confirmSignUp(confirmSignUpRequest);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Sign in with Cognito credentials' })
  @ApiResponse({
    status: 200,
    description: 'Sign in successful',
    schema: {
      type: 'object',
      properties: {
        accessToken: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
        refreshToken: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
        idToken: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
        expiresIn: {
          type: 'number',
          example: 3600,
        },
        tokenType: {
          type: 'string',
          example: 'Bearer',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'user@example.com',
        },
        password: {
          type: 'string',
          example: 'password123',
        },
      },
      required: ['email', 'password'],
    },
  })
  async signIn(
    @Body() credentials: SigninRequestDTO,
  ): Promise<AuthResponseDTO> {
    return this.authService.signIn(credentials);
  }
}
