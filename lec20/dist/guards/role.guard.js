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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessGuard = exports.Admin = exports.Editor = exports.Viewer = void 0;
const common_1 = require("@nestjs/common");
let Viewer = class Viewer {
    canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const role = req.headers['role'];
        if (role === 'viewer' || role === 'editor' || role === 'admin') {
            return true;
        }
        return false;
    }
};
exports.Viewer = Viewer;
exports.Viewer = Viewer = __decorate([
    (0, common_1.Injectable)()
], Viewer);
let Editor = class Editor {
    canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const role = req.headers['role'];
        if (role === 'editor' || role === 'admin') {
            return true;
        }
        return false;
    }
};
exports.Editor = Editor;
exports.Editor = Editor = __decorate([
    (0, common_1.Injectable)()
], Editor);
let Admin = class Admin {
    canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const role = req.headers['role'];
        if (role === 'admin') {
            return true;
        }
        return false;
    }
};
exports.Admin = Admin;
exports.Admin = Admin = __decorate([
    (0, common_1.Injectable)()
], Admin);
let AccessGuard = class AccessGuard {
    roles;
    constructor(...args) {
        this.roles = args;
    }
    canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const role = req.headers['role'];
        if (!this.roles.includes(role)) {
            return false;
        }
        return true;
    }
};
exports.AccessGuard = AccessGuard;
exports.AccessGuard = AccessGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], AccessGuard);
//# sourceMappingURL=role.guard.js.map