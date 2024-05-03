import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DeleteResult, ILike, LessThan, MoreThan, Repository } from "typeorm";
import { Produto } from "../entities/produto.entities";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoriaService } from "../../categoria/service/categoria.service";

@Injectable()
export class ProdutoService {

    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>,
        private categoriaService: CategoriaService
    ) { }
    
    async findAll(): Promise<Produto[]> {
        return await this.produtoRepository.find({
            relations:{
                categoria: true
            }
        });
    }
    async findById(id: number): Promise<Produto>{
        let produto = await this.produtoRepository.findOne({
            where: {
                id
            },relations:{
                categoria: true
            }
        });
        if (!produto)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

        return produto;
    }
    async findByNome(nome: string): Promise<Produto[]>{
        return await this.produtoRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            },relations:{
                categoria: true
            }
        })
    }

    async findByMaiorPreco(preco: number): Promise<Produto[]> {
        return await this.produtoRepository.find({
            where: {
                preco: MoreThan(preco)
            },
            order: {
                nome: 'ASC'
            },
            relations: {
                categoria: true
            }
        })
    }

    async findByMenorPreco(preco: number): Promise<Produto[]> {
        return await this.produtoRepository.find({
            where: {
                preco: LessThan(preco)
            },
            order: {
                nome: 'DESC'
            },
            relations: {
                categoria: true
            }
        })
    }

    async create(produto: Produto): Promise<Produto>{


        if (produto.categoria){

            let categorias = await this.categoriaService.findById(produto.categoria.id)

            if(!categorias)
                throw new HttpException('Categoria não foi encontrada!', HttpStatus.NOT_FOUND)

            return await this.produtoRepository.save(produto);
        }


        return await this.produtoRepository.save(produto);

    }

    async update(produto: Produto): Promise<Produto>{

        if (produto.categoria){

            let categorias = await this.categoriaService.findById(produto.categoria.id)

            if(!categorias)
                throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND)

            return await this.produtoRepository.save(produto);
        }

        let buscaProdutos = await this.findById(produto.id);

        if (!buscaProdutos || !produto.id)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);
     
        return await this.produtoRepository.save(produto);
    }
    async delete(id: number): Promise<DeleteResult>{
        let buscaProdutos = await this.findById(id)

        if (!buscaProdutos)
            throw new HttpException('Produtos não encontrado!', HttpStatus.NOT_FOUND);

        return await this.produtoRepository.delete(id);
    }
 
}