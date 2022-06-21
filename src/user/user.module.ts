import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';
import bcrypt from 'bcrypt';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;

          schema.pre('save', async function (next) {
            if (!this.isModified('password')) return next();

            this.password = await bcrypt.hash(this.password, 10);

            next();
          });

          schema.methods.checkPassword = function (
            passwordCheck: string,
            currentPassword: string,
          ) {
            return bcrypt.compare(passwordCheck, currentPassword);
          };

          return schema;
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
