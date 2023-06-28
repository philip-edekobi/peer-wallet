const bcrypt = require("bcrypt");

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (err) {
    throw err;
  }
};

export const comparePasswordWithHash = async (
  password: string,
  hash: string
): Promise<boolean> => {
  try {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  } catch (err) {
    throw err;
  }
};
