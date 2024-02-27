export function loadEnvironmentVariable(keyname: string) {
  const envVar = process.env[keyname];

  if (!envVar) {
    throw new Error(`Configuration must include ${keyname}`);
  }

  return envVar;
}
