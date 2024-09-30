import bcrypt from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
  const hash = await bcrypt.hash(password , 10);
  return hash;
}

export async function verifyPassword(
  hash: string,
  password: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}
