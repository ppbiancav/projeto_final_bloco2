import { Module } from '@nestjs/common';
import { Categoria } from './entities/Categoria.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaController } from '../categoria/controllers/categoria.controller';
import { CategoriaService } from './service/categoria.service';


@Module({
    imports: [TypeOrmModule.forFeature([Categoria])],
    controllers: [CategoriaController],
    providers: [CategoriaService],
    exports: [TypeOrmModule]
})
export class CategoriaModule {};