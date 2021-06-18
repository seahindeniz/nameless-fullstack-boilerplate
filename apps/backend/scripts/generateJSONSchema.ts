import { promises as fs } from 'fs';
import { Config, createGenerator } from 'ts-json-schema-generator';
import glob from 'glob-promise';
import { execSync } from 'child_process';

const schemaFolder = 'src/models/schema';

async function exists(path: string) {
  try {
    await fs.access(path);

    return true;
  } catch {
    return false;
  }
}

async function generateSchema(path: string) {
  try {
    const timeStart = Date.now();

    // https://regex101.com/r/MJNoHz/1
    const outputPath = path.replace(
      /^(?:.+[\\/])*(.+)\.(?:.+)$/,
      `${schemaFolder}/$1.json`,
    );

    if (await exists(outputPath)) {
      const [modelFileStats, schemaFileStats] = await Promise.all([
        fs.stat(path),
        fs.stat(outputPath),
      ]);

      if (modelFileStats.mtimeMs <= schemaFileStats.mtimeMs) return;
    }

    const config: Config = {
      path,
      type: '*',
      skipTypeCheck: true,
      additionalProperties: false,
      sortProps: true,
    };

    // console.log(path);
    // console.log(outputPath);

    const schema = createGenerator(config).createSchema(config.type);

    if (!schema?.definitions) return;

    const schemaString = JSON.stringify(schema.definitions, null, 2);

    await fs.writeFile(outputPath, schemaString);

    console.info(
      `${path} schema file generated ⏱️  ${(Date.now() - timeStart) / 1000}s`,
    );
  } catch (error) {
    console.error(error);
  }
}

(async () => {
  try {
    if (!(await exists(schemaFolder))) {
      await fs.mkdir(schemaFolder);
    }

    const paths = await glob('src/models/**/*.ts');

    await Promise.all(paths.map(generateSchema));

    if (process.argv[2] === 'before-commit')
      execSync(`git add -A ${schemaFolder}`, { encoding: 'utf-8' });
  } catch (error) {
    console.error(error);
  }
})();
