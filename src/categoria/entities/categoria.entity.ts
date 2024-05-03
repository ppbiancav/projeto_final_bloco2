import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Produto } from "../../produto/entities/produto.entities";
    
    @Entity({name: "tb_categorias"})
    export class Categoria{
        @PrimaryGeneratedColumn()
        id: number
    
        @IsNotEmpty()
        @Column({length: 255, nullable:false})
        tipo: string

        @OneToMany(() => Produto, (produto) => produto.categoria)
        produto: Produto[];
    }
