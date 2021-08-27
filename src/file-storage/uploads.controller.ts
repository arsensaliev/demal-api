import { Controller, Get, Param, Res } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('uploads')
@Controller('uploads')
export class UploadsController {
  @ApiOkResponse({ description: 'Image has been retrieved.' })
  @ApiNotFoundResponse({ description: 'Image not found.' })
  @ApiParam({
    name: 'imagePath',
    description: 'Image identifier',
    type: String,
  })
  @Get(':imagePath')
  async findOne(@Param('imagePath') imagePath, @Res() res) {
    return res.sendFile(imagePath, { root: '/tmp/uploads' });
  }
}
