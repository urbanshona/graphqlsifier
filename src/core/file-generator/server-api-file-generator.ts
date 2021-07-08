import {FileGenerator} from '@graphqlsifier-core/file-generator/file-generator';
import {FileNameType} from '@graphqlsifier-core/core-gen';
import {ClassDeclaration, PropertyDeclaration, SourceFile} from 'ts-morph';
import {logger} from '@graphqlsifier-shared/logger';
logger.context = 'Graphqlsifier';

export enum GraphQLObjectType
{
    argType = 'a',
    inputType = 'i',
    objectType = 'o'
}
export interface IDecoratorOptions
{
    isToAddClassValidatorDecorators: boolean;
    isToAddNestJSGraphQLDecorators: boolean;
    isEverythingOptional: boolean;
    graphqlObjectType: GraphQLObjectType;

}

export class ServerAPIFileGenerator extends FileGenerator
{

    constructor(sourceFilePathGlob: string,
                public rootOutputDir: string,
                fileNameType: FileNameType,
                public options: IDecoratorOptions)
    {
        super(sourceFilePathGlob, fileNameType);
    }

    generateServerApiFiles(sourceFile: SourceFile, sourceClass: ClassDeclaration)
    {
        const pathOfFile = `${this.rootOutputDir}/${this.standardFileNamePrefix(sourceClass.getName())}.ts`;

        // create input files from entities
        const outputFile = this.project.createSourceFile(pathOfFile, {
        }, { overwrite: true });

         const defaultClass = outputFile.addClass({
            name: sourceClass.getName(),
        });
        // const searchOptionsClass = outputFile.addClass({
        //     name: `${sourceClass.getName()}SearchOptions`,
        // });
        //
        // const addInputClass = outputFile.addClass({
        //     name: `Add${sourceClass.getName()}Input`,
        // });
        //
        // const updateInputClass = outputFile.addClass({
        //     name: `Update${sourceClass.getName()}Input`
        // });

         this.addClassValidatorOrNestJSDecorators(sourceFile, sourceClass, defaultClass, outputFile, this.options);

        // this.addClassValidatorOrNestJSDecorators(sourceFile, sourceClass, searchOptionsClass, outputFile, this.options);
        // this.addClassValidatorOrNestJSDecorators(sourceFile, sourceClass, addInputClass, outputFile,this.options);
        // this.addClassValidatorOrNestJSDecorators(sourceFile, sourceClass, updateInputClass, outputFile,  this.options);


        logger.log(`${sourceClass.getName()} --> ${pathOfFile}`);

        outputFile.save();
    }

    // @ts-ignore
    addClassValidatorOrNestJSDecorators(sourceFile: SourceFile,
                                        sourceClass: ClassDeclaration,
                                        destinationClass: ClassDeclaration,
                                        destinationFile: SourceFile,
                                        options: IDecoratorOptions)
    {
        //add file imports

        // TODO: Add Actual File Imports
        const importDeclaration = destinationFile.addImportDeclaration({
            defaultImport: "MyClass",
            moduleSpecifier: "./file",
        });

        importDeclaration.addNamedImports([{
            name: 'IsInt'
        }]);

        //add class decortor

        if(options.isToAddNestJSGraphQLDecorators)
        {
            switch(options.graphqlObjectType)
            {
                case GraphQLObjectType.argType:
                    destinationClass.addDecorator({
                        name: "ArgType",
                        arguments: []
                    });
                    break;
                case GraphQLObjectType.inputType:
                    destinationClass.addDecorator({
                        name: "InputType",
                        arguments: []
                    });
                    break;
                case GraphQLObjectType.objectType:
                    destinationClass.addDecorator({
                        name: "ObjectType",
                        arguments: []
                    });
                    break;

            }
        }


        // traverse each property adding class validator and graphql validators
        sourceClass.getProperties().forEach( singProperty => {

            singProperty.getDecorators().forEach((singDecorator, index, array) => {

                //console.log('\n\nProperty : ' + JSON.stringify(singProperty.getStructure(), null, 2));
                //console.log('\n\nDecorator : ' + JSON.stringify(singDecorator.getStructure(), null, 2));

                if(singDecorator.getName() === 'PrimaryGeneratedColumn')
                {
                    this.addPropertyDecorator(singProperty, false, 'IsInt', [], 'ID', options);

                }else{

                    const propType = singProperty.getType();

                    if(options.isToAddClassValidatorDecorators && (options.isEverythingOptional || propType.isNullable()))
                    {
                        singProperty.addDecorator({
                            name: "IsOptional",
                            arguments: [],
                        });
                    }


                    if(!propType.isArray()) // Non Array Types
                    {

                        if(propType.isString())
                        {
                            this.addPropertyDecorator(singProperty, propType.isNullable() || options.isEverythingOptional,
                                'IsString',
                                [],
                                'String',
                                options);

                        }else if(propType.isBoolean())
                        {
                            this.addPropertyDecorator(singProperty, propType.isNullable() || options.isEverythingOptional,
                                'IsBoolean',
                                [],
                                'Boolean',
                                options);

                            // TODO: Seperate Int from Float
                        }else if(propType.isNumber()) // Int
                        {

                            this.addPropertyDecorator(singProperty, propType.isNullable() || options.isEverythingOptional,
                                'IsNumber',
                                [],
                                'Float',
                                options);

                            // TODO: Seperate Int from Float
                        }else if(propType.isNumber()) // Float
                        {
                            this.addPropertyDecorator(singProperty, propType.isNullable() || options.isEverythingOptional,
                                'IsInt',
                                [],
                                'Int',
                                options);
                        }else if(propType.isObject()) // Object
                        {

                            // TODO: Add Actual Custom Object Field Type
                            this.addPropertyDecorator(singProperty, propType.isNullable() || options.isEverythingOptional,
                                null,
                                null,
                                'Tunde',
                                options,
                                false,
                                true);
                        }



                    }else if(propType.isArray()) // Array Types
                    {
                        singProperty.addDecorator({
                            name: "IsArray",
                            arguments: []
                        });

                        if(propType.isString())
                        {
                            this.addPropertyDecorator(singProperty, propType.isNullable() || options.isEverythingOptional,
                                'IsString',
                                [`{each: true}`],
                                'String',
                                options);

                        }else if(propType.isBoolean())
                        {
                            this.addPropertyDecorator(singProperty, propType.isNullable() || options.isEverythingOptional,
                                'IsBoolean',
                                [],
                                'Boolean',
                                options,
                                true);

                            // TODO: Seperate Int from Float
                        }else if(propType.isNumber()) // Int
                        {

                            this.addPropertyDecorator(singProperty, propType.isNullable() || options.isEverythingOptional,
                                'IsNumber',
                                [`{each: true}`],
                                'Float',
                                options);

                            // TODO: Seperate Int from Float
                        }else if(propType.isNumber()) // Float
                        {
                            this.addPropertyDecorator(singProperty, propType.isNullable() || options.isEverythingOptional,
                                'IsInt',
                                [],
                                'Int',
                                options,
                                true);
                        }else if(propType.isObject()) // Object
                        {
                            // TODO: Add Actual Custom Object Field Type
                            this.addPropertyDecorator(singProperty, propType.isNullable() || options.isEverythingOptional,
                                null,
                                null,
                                'Tunde',
                                options,
                                true,
                                true);
                        }


                    }
                }



                //  if(singDecorator.getName() === 'Column')
                // {
                //     // singDecorator.getArguments().forEach( singDecoratorArg => console.log(singDecoratorArg));
                //
                // }else if(singDecorator.getName() === 'ManyToOne')
                // {
                //
                // }else if(singDecorator.getName() === 'JoinColumn')
                // {
                //
                // }else if(singDecorator.getName() === 'OneToMany')
                // {
                //
                // }

                // add a property with a new line except for the last property

                if(index !== (array.length - 1))
                {
                    destinationClass.addProperty(singProperty.getStructure()).appendWhitespace(x => x.newLine());

                }else{
                    destinationClass.addProperty(singProperty.getStructure());
                }



            });






        });

        // copy the source file's properties

    }

    addPropertyDecorator(singProperty: PropertyDeclaration,
                         isNullable: boolean,
                         classValidatorDecorator: string,
                         classValidatorDecoratorArgs: string[],
                         fieldType: string,
                         options: IDecoratorOptions,
                         isToAddClassValidatorArrayTag = false,
                         isPropertyObjectType = false)
    {
        if(options.isToAddClassValidatorDecorators)
        {
            if(classValidatorDecorator?.length && classValidatorDecoratorArgs?.length)
            {
                singProperty.addDecorator({
                    name: classValidatorDecorator,
                    arguments: classValidatorDecoratorArgs,
                });
            }

            if(isToAddClassValidatorArrayTag)
            {

                singProperty.addDecorator({
                    name: 'IsArray',
                    arguments: [],
                });

            }

            if(isPropertyObjectType)
            {

                if(isToAddClassValidatorArrayTag) // array of objects
                {
                    singProperty.addDecorator({
                        name: 'ValidateNested',
                        arguments: [`{each: true}`],
                    });

                }else{
                    singProperty.addDecorator({ // just an object not an array
                        name: 'ValidateNested',
                        arguments: [],
                    });

                }

                singProperty.addDecorator({
                    name: 'Type',
                    arguments: [`() => ${fieldType}`],
                });

            }




        }
        if(options.isToAddNestJSGraphQLDecorators)
        {
            if(isNullable) // Nullable
            {
                singProperty.addDecorator({
                    name: "Field",
                    arguments: [`type => ${fieldType}`, `{nullable: true}`],
                });
            }else{ // Not nullable
                singProperty.addDecorator({
                    name: "Field",
                    arguments: [`type => ${fieldType}`, `{nullable: false}`],
                });
            }
        }
    }

}