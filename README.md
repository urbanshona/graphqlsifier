# UrbanShona graphqlsifier

> A Command Line App for adding "code first" nestjs graphql decorators and or class validator decorators to TypeORM entities. 

## Installation

```shell
npm i @urbanshona/graphqlsifier
```

## Usage

```shell
graphqlsifier -s [Input] -o [Output] -q [Quote]

Options:
 --help                Show help
--version              Show version number

-s, --source           The Folder Containing TypeORM Entity Classes written in Typescript       [string]

-o, --output           The Folder to place generated classes that have been modified            [string]
                       to include NestJS Graphql decorators and or Class Validator
                       decorators (* for simple changes, source can be the same as the 
                       output - Always create a backup before testing this).

-v, --validator        Whether to add Class Validator Decorators to each respective property   [boolean]

-g, --graphql          Whether to add NestJS Graphql Decorators to each respective property    [boolean]

-p, --optional          Whether each non primary key property is to hold optional decorators   [boolean]


-j, --object           The Graphql Type Decorator to append to the generated classes           [string]
                       eg -j i (for Input Type) 
                       a : Arg Type
                       i : Input Type
                       o : Object Type (default)
                 
```

## Example

```shell

e.g graphqlsifier -s server/entities -o browser/entities -q true

```