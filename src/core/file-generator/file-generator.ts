import {Project} from 'ts-morph';
import {FileNameType} from '@graphqlsifier-core/core-gen';
import _ from 'lodash';

export class FileGenerator {
    public project: Project;

    constructor(sourceFilePathGlob: string, public fileNameType: FileNameType) {
        this.project = new Project();

        if (sourceFilePathGlob) {
            this.project.addSourceFilesAtPaths(sourceFilePathGlob);
        }


    }

    standardFileNamePrefix(probe: string) {

        switch (this.fileNameType) {
            case FileNameType.kebabCase:
                return _.kebabCase(probe);

            case FileNameType.camelCase:
                return _.camelCase(probe);

            case FileNameType.pascalCase:
                return _.upperFirst(_.camelCase(probe));

            case FileNameType.snakeCase:
                return _.snakeCase(probe);
        }

        // return pascal case as default
        return _.upperFirst(_.camelCase(probe));

    }


}