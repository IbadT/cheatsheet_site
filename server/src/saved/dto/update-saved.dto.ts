import { PartialType } from '@nestjs/swagger';
import { AddPostToSavedDto } from './add-post-to-saved.dto';

export class UpdateSavedDto extends PartialType(AddPostToSavedDto) {}
