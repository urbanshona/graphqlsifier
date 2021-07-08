import MyClass, { IsInt } from "./file";

@ObjectType()
class District {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    @Field(type => ID, {nullable: false})
    id: number;
    @Column("varchar", { name: "name", unique: true, length: 45 })
    @Field(type => String, {nullable: false})
    name: string;
    @Column("varchar", { name: "postal_code", nullable: true, length: 250 })
    @Field(type => String, {nullable: false})
    postalCode: string | null;
    @Column("int", { name: "city_id" })
    @Field(type => Float, {nullable: false})
    cityId: number;
    @ManyToOne(() => City, (city) => city.districts, {
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION",
          })
    @JoinColumn([{ name: "city_id", referencedColumnName: "id" }])
    @ValidateNested()
    @Type(() => Tunde)
    @Field(type => Tunde, {nullable: false})
    city: City;
    @ManyToOne(() => City, (city) => city.districts, {
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION",
          })
    @JoinColumn([{ name: "city_id", referencedColumnName: "id" }])
    @ValidateNested()
    @Type(() => Tunde)
    @Field(type => Tunde, {nullable: false})
    @ValidateNested()
    @Type(() => Tunde)
    @Field(type => Tunde, {nullable: false})
    city: City;
}
