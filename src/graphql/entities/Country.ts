import MyClass, { IsInt } from "./file";

@ObjectType()
class Country {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    @Field(type => ID, {nullable: false})
    id: number;
    @Column("varchar", { name: "code", unique: true, length: 45 })
    @Field(type => String, {nullable: false})
    code: string;
    @Column("int", { name: "continent_id" })
    @Field(type => Float, {nullable: false})
    continentId: number;
    @Column("varchar", { name: "name", nullable: true, unique: true, length: 45 })
    @Field(type => String, {nullable: false})
    name: string | null;
    @ManyToOne(() => Continent, (continent) => continent.countries, {
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION",
          })
    @JoinColumn([{ name: "continent_id", referencedColumnName: "id" }])
    @ValidateNested()
    @Type(() => Tunde)
    @Field(type => Tunde, {nullable: false})
    continent: Continent;
    @ManyToOne(() => Continent, (continent) => continent.countries, {
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION",
          })
    @JoinColumn([{ name: "continent_id", referencedColumnName: "id" }])
    @ValidateNested()
    @Type(() => Tunde)
    @Field(type => Tunde, {nullable: false})
    @ValidateNested()
    @Type(() => Tunde)
    @Field(type => Tunde, {nullable: false})
    continent: Continent;
    @OneToMany(() => Province, (province) => province.country)
    @IsArray()
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => Tunde)
    @Field(type => Tunde, {nullable: false})
    provinces: Province[];
}
