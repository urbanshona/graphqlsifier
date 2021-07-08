import MyClass, { IsInt } from "./file";

@ObjectType()
class Continent {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    @Field(type => ID, {nullable: false})
    id: number;
    @Column("varchar", { name: "code", unique: true, length: 45 })
    @Field(type => String, {nullable: false})
    code: string;
    @Column("varchar", { name: "name", nullable: true, unique: true, length: 45 })
    @Field(type => String, {nullable: false})
    name: string | null;
    @OneToMany(() => Country, (country) => country.continent)
    @IsArray()
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => Tunde)
    @Field(type => Tunde, {nullable: false})
    countries: Country[];
}
