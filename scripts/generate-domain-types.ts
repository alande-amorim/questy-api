import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { getDMMF } from '@prisma/internals';
import { DMMF } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();
const outputDir = path.join(__dirname, '../src/shared/domain/types');

const kebabCase = (str: string) => {
  return str
    .replace(/([A-Z])/g, '-$1')
    .replace(/^-/, '')
    .toLowerCase();
};

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Helper to convert Prisma types to TypeScript types
const enumTypes = [];
function convertPrismaType(type: string): string {
  const typeMap: Record<string, string> = {
    String: 'string',
    Int: 'number',
    BigInt: 'number',
    Float: 'number',
    Decimal: 'number',
    Boolean: 'boolean',
    DateTime: 'Date',
    Json: 'unknown',
    Bytes: 'Buffer',
  };
  if (enumTypes.find((e) => e.name === type)) {
    return type;
  }
  return typeMap[type] || 'unknown';
}

// Helper to convert PascalCase to camelCase
function toPascalCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Get required imports for an entity
function getRequiredImports(model: any): string[] {
  const imports = new Set<string>();

  // Check fields for relations
  model.fields.forEach((field: DMMF.Field) => {
    if (field.relationName) {
      const relatedModel = field.type;
      if (relatedModel !== model.name) {
        imports.add(relatedModel);
      }
    }
  });

  return Array.from(imports);
}

// Generate relations file
function generateRelationsFile(models: readonly any[]) {
  const relations = `/**
 * @generated
 * @see scripts/generate-domain-types.ts
 */

/* eslint-disable */
import { ${models.map((m) => m.name).join(', ')} } from '.';

export namespace Relations {
${models
  .map((model) => {
    const relationFields = model.fields
      .filter((field: DMMF.Field) => field.relationName)
      .map((field: DMMF.Field) => {
        const relatedModel = field.type;
        const isArray = field.isList;
        const type = isArray
          ? `${relatedModel}.Entity[]`
          : `${relatedModel}.Entity`;
        return `  export interface With${model.name}${toPascalCase(field.name)} {
    ${field.name}: ${type};
  }`;
      })
      .join('\n\n');

    return relationFields;
  })
  .join('\n\n')}
}
`;

  fs.writeFileSync(path.join(outputDir, 'relations.ts'), relations);
}

// Generate entity types
async function generateEntityTypes() {
  // Read Prisma schema
  const schemaPath = path.join(__dirname, '../prisma/schema.prisma');
  const schemaContent = fs.readFileSync(schemaPath, 'utf-8');
  const dmmf = await getDMMF({ datamodel: schemaContent });

  // get enum types
  enumTypes.push(...dmmf.datamodel.enums);

  // Filter only models (entities)
  const models = dmmf.datamodel.models;

  // Generate types for each model
  for (const model of models) {
    const imports = getRequiredImports(model);
    const importStatements =
      imports.length > 0
        ? imports.map((imp) => `import { ${imp} } from '.';`).join('\n') +
          '\n\n'
        : '';

    // Generate Enums
    const enumNames = model.fields
      .filter(({ kind }) => kind === 'enum')
      .map(({ type }) => type);

    const modelEnums = enumNames.map((enumType) => {
      const _enum = enumTypes.find((_enum) => {
        return _enum.name === enumType;
      });

      // write const enum declaration to string
      const enumDeclaration = `export const ${enumType} = {
        ${_enum.values.map(({ name }) => `${name}: '${name}',`).join('\n')}
      } as const;
      export type ${enumType} = (typeof ${enumType})[keyof typeof ${enumType}];
      `;

      return enumDeclaration;
    });

    // Generate Entity interface
    const entityFields = model.fields
      .filter((field: DMMF.Field) => !field.relationName)
      .map((field: DMMF.Field) => {
        const type = convertPrismaType(field.type);
        const optional = field.isRequired ? '' : '?';
        return `    ${field.name}${optional}: ${type};`;
      })
      .join('\n');

    // Generate WithRelations interface
    const relationFields = model.fields
      .filter((field: DMMF.Field) => field.relationName)
      .map((field: DMMF.Field) => {
        const relatedModel = field.type;
        const isArray = field.isList;
        const type = isArray
          ? `${relatedModel}.Entity[]`
          : `${relatedModel}.Entity`;
        return `    ${field.name}?: ${type};`;
      })
      .join('\n');

    // Generate DTOs
    const createFields = model.fields
      .filter(
        (field: DMMF.Field) =>
          !field.isId &&
          !field.relationName &&
          !field.name.includes('created_at') &&
          !field.name.includes('updated_at') &&
          !field.name.includes('createdAt') &&
          !field.name.includes('updatedAt'),
      )
      .map((field: DMMF.Field) => {
        const type = convertPrismaType(field.type);
        const optional = field.isRequired ? '' : '?';
        return `    ${field.name}${optional}: ${type};`;
      })
      .join('\n');

    const updateFields = model.fields
      .filter(
        (field: DMMF.Field) =>
          !field.isId &&
          !field.relationName &&
          !field.name.includes('created_at') &&
          !field.name.includes('updated_at') &&
          !field.name.includes('createdAt') &&
          !field.name.includes('updatedAt'),
      )
      .map((field: DMMF.Field) => {
        const type = convertPrismaType(field.type);
        return `    ${field.name}?: ${type};`;
      })
      .join('\n');

    const content = `/**
 * @generated
 * @see scripts/generate-domain-types.ts
 */

/* eslint-disable */
${importStatements}export namespace ${model.name} {
  export interface Entity {
${entityFields}
  }

  export interface WithRelations extends Entity {
${relationFields}
  }

  export interface CreateDTO {
${createFields}
  }

  export interface UpdateDTO {
${updateFields}
  }

  ${modelEnums}
}
`;

    fs.writeFileSync(
      path.join(outputDir, `${kebabCase(model.name)}.ts`),
      content,
    );
  }

  // Generate relations file
  generateRelationsFile(models);
}

// Generate index file
function generateIndexFile() {
  const files = fs
    .readdirSync(outputDir)
    .filter((file) => file.endsWith('.ts') && file !== 'index.ts')
    .map((file) => file.replace('.ts', ''));

  const index = `/**
 * @generated
 * @see scripts/generate-domain-types.ts
 */

/* eslint-disable */
${files.map((file) => `export * from './${file}';`).join('\n')}
`;

  fs.writeFileSync(path.join(outputDir, 'index.ts'), index);
}

async function main() {
  try {
    await generateEntityTypes();
    generateIndexFile();
    console.log('Domain types generated successfully!');
  } catch (error) {
    console.error('Error generating domain types:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
