import { Passwords } from '.';
export declare enum Gender {
    MALE = "male",
    FEMALE = "female"
}
export declare enum Remove {
    FALSE = "false",
    TRUE = "true"
}
export declare enum Provider {
    GOOGLE = "google",
    DEFAULT = "default"
}
export declare class Users {
    id: number;
    email: string;
    name?: string;
    birthday?: Date;
    image: string;
    gender?: Gender;
    phone?: string;
    address?: string;
    provider?: Provider;
    remove: Remove;
    created_at: Date;
    updated_at: Date;
    password: Passwords;
}
