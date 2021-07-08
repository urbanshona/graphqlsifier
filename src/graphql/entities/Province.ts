import MyClass, { IsInt } from "./file";

@ObjectType()
class Province {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    @Field(type => ID, {nullable: false})
    id: number;
    @Column("varchar", { name: "name", unique: true, length: 45 })
    @Field(type => String, {nullable: false})
    name: string;
    @Column("varchar", { name: "postal_code", nullable: true, length: 45 })
    @Field(type => String, {nullable: false})
    postalCode: string | null;
    @Column("int", { name: "country_id" })
    @Field(type => Float, {nullable: false})
    countryId: number;
    @OneToMany(() => City, (city) => city.province)
    @IsArray()
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => Tunde)
    @Field(type => Tunde, {nullable: false})
    cities: City[];
    @ManyToOne(() => Country, (country) => country.provinces, {
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION",
          })
    @JoinColumn([{ name: "country_id", referencedColumnName: "id" }])
    @ValidateNested()
    @Type(() => Tunde)
    @Field(type => Tunde, {nullable: false})
    country: Country;
    @ManyToOne(() => Country, (country) => country.provinces, {
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION",
          })
    @JoinColumn([{ name: "country_id", referencedColumnName: "id" }])
    @ValidateNested()
    @Type(() => Tunde)
    @Field(type => Tunde, {nullable: false})
    @ValidateNested()
    @Type(() => Tunde)
    @Field(type => Tunde, {nullable: false})
    country: Country;
}
