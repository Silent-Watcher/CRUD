import { hashPassword, verifyPassword } from '$app/common/utils/password.util';
import { signToken } from '$app/common/utils/token.utils';
import { Controller } from '$interfaces/Controller';
import { userModel } from '$modules/user/user.model';

import { authMessages } from './auth.messages';

import type { LoginDto, RegisterDto } from '$validation/schema/auth.schema';

class AuthService extends Controller {
  constructor() {
    super();
  }

  async register(dto: RegisterDto) {
    dto.password = await hashPassword(dto.password);

    const newUser = await userModel.create({
      email: dto.email,
      password: dto.password,
    });

    return newUser;
  }

  async login(dto: LoginDto) {
    const foundedUser = await this.isEmailAlreadyExists(dto.email);

    // check for credentials
    if (!foundedUser) {
      throw {
        status: 400,
        code: 'BAD REQUEST',
        message: authMessages.invalidCredentials,
      };
    }

    const isPasswordValid = await this.checkIfThePasswordIsCorrect(
      dto.password,
      foundedUser.password,
    );
    if (!isPasswordValid) {
      throw {
        status: 400,
        message: authMessages.invalidCredentials,
      };
    }

    // credentials are  correct let's create an access_token !
    return signToken({ _id: foundedUser._id, email: foundedUser.email });
  }

  async isEmailAlreadyExists(email: string) {
    const foundedUser = await userModel
      .findOne({ email }, { _id: 1, email: 1, password: 1 })
      .lean();
    return foundedUser === null ? false : foundedUser;
  }

  async checkIfThePasswordIsCorrect(password: string, hash: string) {
    return await verifyPassword(hash, password);
  }
}

export default new AuthService();
