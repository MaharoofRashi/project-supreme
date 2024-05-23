import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    @Post('/signup')
    async signup(@Body() body: any) {}

    @Post('/login')
    async login(@Body() body: any) {}

    @Post('/logout')
    async logout(@Body() body: any) {}

    @Post('/refresh')
    async refresh(@Body() body: any) {}
}
