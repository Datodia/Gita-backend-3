import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SafeGuard } from 'src/guards/safe.guard';
import { AccessGuard, Admin, Editor, Viewer } from 'src/guards/role.guard';


// @UseGuards(SafeGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(new AccessGuard('admin', 'editor'))
  // @UseGuards(SafeGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  // @UseGuards(Viewer)
  @UseGuards(new AccessGuard('viewer', 'admin', 'editor'))
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(new AccessGuard('viewer', 'admin', 'editor'))
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(new AccessGuard('admin', 'editor'))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(new AccessGuard('admin'))
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
