"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let UsersService = class UsersService {
    userModel;
    expenseModel;
    constructor(userModel, expenseModel) {
        this.userModel = userModel;
        this.expenseModel = expenseModel;
    }
    async create({ age, email, fullName, address }) {
        const existUser = await this.userModel.findOne({ email });
        if (existUser) {
            throw new common_1.BadRequestException('User alredy exists');
        }
        const newUser = await this.userModel.create({
            age,
            email,
            fullName,
            password: "test123",
            address
        });
        return newUser;
    }
    findAll() {
        return this.userModel.find();
    }
    async findOne(id) {
        const user = await this.userModel.findById(id).populate({ path: 'expenses', select: 'amount category -_id' });
        return user;
    }
    async update(id, updateUserDto) {
        const user = await this.userModel.findById(id);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (updateUserDto.fullName)
            user.fullName = updateUserDto.fullName;
        if (updateUserDto.email)
            user.email = updateUserDto.email;
        if (updateUserDto.age)
            user.age = updateUserDto.age;
        if (updateUserDto.address) {
            Object.assign(user.address, updateUserDto.address);
        }
        return user.save();
    }
    async addExpenseToUser(userId, expenseId) {
        const updatedUser = await this.userModel.findByIdAndUpdate(userId, {
            $push: { expenses: expenseId }
        });
        return updatedUser;
    }
    async remove(id) {
        const deletedUser = await this.userModel.findByIdAndDelete(id);
        if (!deletedUser) {
            throw new common_1.NotFoundException('user not found');
        }
        await this.expenseModel.deleteMany({ owner: id });
        return deletedUser;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('user')),
    __param(1, (0, mongoose_1.InjectModel)('expense')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map