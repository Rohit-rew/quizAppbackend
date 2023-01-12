import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AdminRepository } from './adminAuth.repository';
import { AdminRegister } from './schema/adminAuth.schema';

// bcrypt
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AdminQuizrepo } from 'src/admin/AdminQuiz.repository';
import AdminQuizService from 'src/admin/admin';
import { adminLoginBody, adminRegisterBody } from './types/admin.types';

@Injectable()
export class AdminService {
  constructor(
    private adminRepo: AdminRepository,
    private jwtService: JwtService,
    private adminQuizService : AdminQuizService
  ) {}

  async registerAdmin(adminData: adminRegisterBody): Promise<AdminRegister> {
    // will receive Jwt in the body then decode and create Admin

    // encrypting the password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(adminData.password, salt);
    adminData.password = hashedPass;

    // check existing Admin
    const existingAdmin = await this.adminRepo.findAdmin(adminData.email);
    if (existingAdmin)
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);

    // if Admin does not exist create new admin
    const newAdmin = await this.adminRepo.createAdmin(adminData);
    if (!newAdmin)
      throw new HttpException(
        'something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
        console.log("registered admin id")
        console.log(newAdmin._id)

    // create admin db collecton 
    console.log({
      name : newAdmin.name,
      email : newAdmin.email,
      adminId : newAdmin._id,
    })
    try {
      await this.adminQuizService.createAdminQuizColl({name : newAdmin.name , email : newAdmin.email , adminId : newAdmin._id , quizes : []})
      return newAdmin;
    } catch (error) {
      console.log(error)
      throw new HttpException(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async loginAdmin(adminData: adminLoginBody): Promise<string> {
    const existingAdmin = await this.adminRepo.findAdmin(adminData.email);
    if (!existingAdmin)
      throw new HttpException('User Does Not Exist', HttpStatus.NOT_FOUND);

    const passwordIsCorrect = await bcrypt.compare(
      adminData.password,
      existingAdmin.password,
    );
    if (!passwordIsCorrect)
      throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);

    // return a JWT token
    const jwt = await this.jwtService.signAsync(
      { email: existingAdmin.email , name: existingAdmin.name , admin: true , id : existingAdmin._id },
      { algorithm: 'HS256', secret: process.env.JWT_SECRET, expiresIn: '1d' },
    );
    return jwt;
  }
}
