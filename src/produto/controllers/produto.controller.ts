import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseFloatPipe, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ProdutoService } from "../services/produto.service";
import { Produto } from "../entities/produto.entities";


@Controller("/produtos")
export class ProdutoController{
    
    constructor(private readonly produtoService: ProdutoService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Produto[]>{
        return this.produtoService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id : number): Promise<Produto>{
        return this.produtoService.findById(id);
    }
    @Get('nome/:nome')
    @HttpCode(HttpStatus.OK)
    findByTipo(@Param('nome')titulo : string): Promise<Produto[]>{
        return this.produtoService.findByNome(titulo);
    }

    @Get('preco/maior/:preco')
    @HttpCode(HttpStatus.OK)
    findByMaiorPreco(@Param('preco', ParseFloatPipe) preco : number): Promise<Produto[]>{
        try {
            return this.produtoService.findByMaiorPreco(preco);
        } catch (error) {
            throw new Error('Erro ao processar sua solicitação');
        }
    }

    @Get('preco/menor/:preco')
    @HttpCode(HttpStatus.OK)
    findByMenorPreco(@Param('preco', ParseFloatPipe) preco : number): Promise<Produto[]>{
        try {
            return this.produtoService.findByMenorPreco(preco);
        } catch (error) {
            throw new Error('Erro ao processar sua solicitação');
        }
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() produto: Produto): Promise<Produto>{
        return this.produtoService.create(produto);
    }
    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() produto: Produto): Promise<Produto> {
        return this.produtoService.update(produto);
    }
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.produtoService.delete(id);
    }
}