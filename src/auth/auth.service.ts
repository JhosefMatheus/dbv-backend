import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { DataSource, InsertResult, QueryFailedError, Repository } from "typeorm";
import { SignInDto, SignUpDto } from "./dto";
import { ISignInResponse, ISignUpResponse } from "./response";
import { TokenService } from "src/token/token.service";
import { hashedText } from "src/funcs";
import { AlertVariant } from "src/enums";
import { UserData } from "src/types";
import { Role } from "src/role/role.entity";
import { RoleGrant } from "src/role/role-grant.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(RoleGrant) private readonly roleGrantRepository: Repository<RoleGrant>,
    private readonly tokenService: TokenService,
    private readonly dataSource: DataSource
  ) { }

  async signIn(signInDto: SignInDto): Promise<ISignInResponse> {
    try {
      const hashedPassword: string = hashedText(signInDto.password);

      const user: User = await this.userRepository.findOneOrFail({
        where: {
          email: signInDto.email,
          password: hashedPassword,
          deletedAt: null
        },
        relations: {
          role: true
        }
      });

      if (!user) {
        throw new UnauthorizedException("E-mail ou senha inválidos.");
      }

      const payload: object = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt
      }

      const token: string = await this.tokenService.generateToken(payload);

      return {
        message: "Usuário logado com sucesso.",
        alertVariant: AlertVariant.SUCCESS,
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          deletedAt: user.deletedAt
        }
      }
    } catch (error: any) {
      throw error;
    }
  }

  async signUp(userFromSession: UserData, signUpDto: SignUpDto): Promise<ISignUpResponse> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const roleFromNewUser: Role = await this.roleRepository.findOneOrFail({
        where: {
          id: signUpDto.roleId,
          deletedAt: null
        }
      });
      
      const roleGrantFlag: boolean = await this.roleGrantRepository.exist({
        where: {
          roleGrantingId: userFromSession.role.id,
          roleGrantedId: roleFromNewUser.id
        }
      });

      if (!roleGrantFlag) {
        throw new UnauthorizedException(`Você não tem permissão para cadastrar um usuário com o cargo ${roleFromNewUser.name}.`);
      }

      const hashedPassword: string = hashedText(signUpDto.password);

      await queryRunner.manager.insert(User, {
        name: signUpDto.name,
        email: signUpDto.email,
        password: hashedPassword,
        roleId: signUpDto.roleId
      });

      await queryRunner.commitTransaction();

      return {
        message: "Usuário cadastrado com sucesso.",
        alertVariant: AlertVariant.SUCCESS
      }
    } catch (error: any) {
      await queryRunner.rollbackTransaction();

      if (error instanceof QueryFailedError) {
        if (error.driverError.code === 'ER_DUP_ENTRY') {
          throw new UnauthorizedException("E-mail já cadastrado.");
        }
      }

      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}