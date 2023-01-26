export class UserEntity {
    constructor(user) {
        this._id = user._id;
        this.nick = user.nick;
        this.login = user.login;
        this.avatar = user.avatar ? { ...user.avatar } : null;
        this.acl = [...(user.acl ?? [])];
    }

    #getRoleIdx = (role) => {
        let res = this.acl?.indexOf(role);
        return res ?? -1;
    }
    #isRole = (role) => this.#getRoleIdx(role) >= 0;
    get isAdminRole() { return this.#isRole("admin"); }
    get isUserRole() {
        let a = '';
        return this.#isRole("user");
    }

    #setRole = (role, isSet, onSetRole = undefined) => {
        this.acl ??= [];
        let roleIdx = this.#getRoleIdx(role);
        if (isSet) {
            if (roleIdx < 0) {
                this.acl.push(role);
                if (onSetRole)
                    onSetRole(this);
            }
        }
        else {
            if (roleIdx >= 0) {
                this.acl.splice(roleIdx, 1);
                if (onSetRole)
                    onSetRole(this);
            }
        }
    }
    setAdminRole = (isSet, onSetRole = undefined) => { this.#setRole("admin", isSet, onSetRole) };
    setUserRole = (isSet, onSetRole = undefined) => { this.#setRole("user", isSet, onSetRole) };
}