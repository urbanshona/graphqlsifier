#!/usr/bin/env node
import yargs from 'yargs';
import {logger} from '@graphqlsifier-shared/logger';
import {FileNameType} from '@graphqlsifier-core/core-gen';
import {FileGenerator} from '@graphqlsifier-core/file-generator/file-generator';
import {IDecoratorOptions, ServerAPIFileGenerator} from '@graphqlsifier-core/file-generator/server-api-file-generator';
logger.context = 'graphqlsifier';

const options: any = yargs.options({
    s: {
        alias: 'source',
        demandOption: true,
        default: `${process.cwd()}/server/core/database/entities`,
        describe: 'The path to the folder containing the TypeORM Entities that need to be stripped of decorators',
        type: 'string'
    },
    o: {
        alias: 'output',
        demandOption: true,
        default: `${process.cwd()}/src/app/core/database/entities`,
        describe: 'The output path to place TypeORM entities that have been stripped of decorators',
        type: 'string'
    },
    v: {
        alias: 'validator',
        demandOption: true,
        default: true,
        describe: 'Add Class Validator Decorators',
        type: 'boolean'
    },
    g: {
        alias: 'graphql',
        demandOption: true,
        default: true,
        describe: 'Add Nest JS GraphQLValidators',
        type: 'boolean'
    },
    p: {
        alias: 'optional',
        demandOption: true,
        default: false,
        describe: 'Is Every Non Primary Key Property Optional',
        type: 'boolean'
    },
    j: {
        alias: 'object',
        demandOption: true,
        default: 'o',
        describe: 'GraphQL Object Type',
        type: 'string'
    },

}).argv;


// logger.log(JSON.stringify(options, null, 2));

const sourceDirOfEntities = `${options.source}`;
const outPutOfEntities = `${options.output}`;
const outPutFileNameType = `${options.name}`;

const genOptions: IDecoratorOptions = {
    isEverythingOptional: options.optional,
    isToAddClassValidatorDecorators: options.validator,
    isToAddNestJSGraphQLDecorators: options.graphql,
    graphqlObjectType: options.object
};

const rootGenerator = new FileGenerator(`${sourceDirOfEntities}/*.ts`, outPutFileNameType as FileNameType);

const serverAPIFileGenerator = new ServerAPIFileGenerator(`${sourceDirOfEntities}/*.ts`, outPutOfEntities, outPutFileNameType as FileNameType, genOptions);


rootGenerator.project.getSourceFiles().forEach((singSourceFile) => {

    const classes = singSourceFile.getClasses();

    classes.forEach((singClass) => {
        // We check if it is the class we want to rename
        if (singClass.getName())
        {

            serverAPIFileGenerator.generateServerApiFiles(singSourceFile, singClass);

        }
    });

});