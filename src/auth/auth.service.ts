import { Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { TokenPayload } from 'src/users/interfaces/token-payload.interface';
import config from '../config';

@Injectable()
export class AuthService {
  comparePasswords(currentPasswordHash: string, comparingPassword: string) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(comparingPassword, currentPasswordHash, (err, success) => {
        if (err) return reject(err);
        return resolve(success);
      });
    });
  }

  generateAuthToken(payload: TokenPayload): string {
    return jwt.sign(payload, config.jwtSecret, { expiresIn: '7d' });
  }

  hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  }
}
