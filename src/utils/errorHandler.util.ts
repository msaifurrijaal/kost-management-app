import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const handleErrorPrisma = (error: any) => {
  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === 'P2003') {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new NotFoundException(`${error?.meta?.field_name} not found`);
    } else if (error.code === 'P2025') {
      throw new NotFoundException('Data not found');
    }
  } else {
    throw new InternalServerErrorException('Something went wrong');
  }
};
