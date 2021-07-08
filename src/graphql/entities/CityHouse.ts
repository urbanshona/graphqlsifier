import MyClass, { IsInt } from "./file";

@ObjectType()
class CityHouse {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    @Field(type => ID, {nullable: false})
    id: number;
    @Column("varchar", { name: "name", unique: true, length: 45 })
    @Field(type => String, {nullable: false})
    name: string;
    @Column("int", { name: "province_id" })
    @Field(type => Float, {nullable: false})
    provinceId: number;
    @ManyToOne(() => Province, (province) => province.cities, {
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION",
          })
    @JoinColumn([{ name: "province_id", referencedColumnName: "id" }])
    @ValidateNested()
    @Type(() => Tunde)
    @Field(type => Tunde, {nullable: false})
    province: Province;
    @ManyToOne(() => Province, (province) => province.cities, {
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION",
          })
    @JoinColumn([{ name: "province_id", referencedColumnName: "id" }])
    @ValidateNested()
    @Type(() => Tunde)
    @Field(type => Tunde, {nullable: false})
    @ValidateNested()
    @Type(() => Tunde)
    @Field(type => Tunde, {nullable: false})
    province: Province;
    @OneToMany(() => District, (district) => district.city)
    @IsArray()
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => Tunde)
    @Field(type => Tunde, {nullable: false})
    districts: District[];
}
